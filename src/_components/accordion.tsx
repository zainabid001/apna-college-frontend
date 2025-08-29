import { useState } from 'react';
import cn from 'classnames';
import { motion, AnimatePresence } from 'framer-motion';
import { subTopicService } from '@/_services/sub.topics';
import { useSelector } from 'react-redux';
import { getUser } from '@/_store/_reducers/user';
import toast from 'react-hot-toast';

type CollapseProps = {
    i: number;
    topic: any;
    expanded: number;
    setExpanded: any;
    onComplete?: (success: boolean) => void;
};

const Collapse: React.FC<CollapseProps> = ({
    i,
    expanded,
    setExpanded,
    topic,
    onComplete,
}) => {
    const userStore = useSelector(getUser);
    const isOpen = i === expanded;
    const activeClass = isOpen ? 'shadow-sm' : '';
    const handleCheckboxChange = async (event: any, subTopic: any) => {
        if(!userStore?.isLoggedIn) return toast.error("Please login first");
        let payload = {
            isComplete: subTopic?.isComplete === true ? false : true,
        }
        await subTopicService.update(userStore?.token, subTopic?._id, payload).then((data) => {
            toast.success("Sub Topic comppleted successfully");
            onComplete && onComplete(true);
        }).catch((error) => {
            console.error("Error", error);
            toast.error("Something went wrong");
        })

    };
    return (
        <div
            className={cn(
                'border border-gray-200 bg-gray-50 shadow-sm rounded-lg mb-2.5 transition-all hover:border-indigo-500',
                activeClass
            )}
        >
            <motion.header
                initial={false}
                onClick={() => setExpanded(isOpen ? false : i)}
                className="py-4 px-5 rounded cursor-pointer flex items-center justify-between transition-colors"
            >
                <h2 className="text-lg text-dark-400 font-body font-bold text-heading">
                    {topic?.name}
                </h2>
                {isOpen ? <p>-</p> : <p>+</p>}
            </motion.header>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div key="content" initial="from" animate="to" exit="from">
                        {/* Responsive table wrapper */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-700">
                                <thead className="bg-gray-800">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-white uppercase tracking-wider">Name</th>
                                        <th className="px-6 py-3 text-left text-white uppercase tracking-wider">Level</th>
                                        <th className="px-6 py-3 text-left text-white uppercase tracking-wider">LeetCode</th>
                                        <th className="px-6 py-3 text-left text-white uppercase tracking-wider">YouTube</th>
                                        <th className="px-6 py-3 text-left text-white uppercase tracking-wider">Article</th>
                                        <th className="px-6 py-3 text-left text-white uppercase tracking-wider">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-700">
                                    {topic?.subTopics?.map((sub: any, index: number) => (
                                        <tr key={index} className="bg-gray-800 hover:bg-gray-700 transition-colors">
                                            <td className="px-4 py-3 text-gray-300">{sub?.name}</td>
                                            <td className="px-4 py-3 text-gray-300">{sub?.level}</td>
                                            <td className="px-4 py-3 text-blue-400 hover:underline">
                                                <a href={sub?.leetcodeLink} target="_blank">LeetCode</a>
                                            </td>
                                            <td className="px-4 py-3 text-red-400 hover:underline">
                                                <a href={sub?.youtubeLink} target="_blank">YouTube</a>
                                            </td>
                                            <td className="px-4 py-3 text-green-400 hover:underline">
                                                <a href={sub?.articleLink} target="_blank">Article</a>
                                            </td>
                                            <td className="px-4 py-3 text-gray-300">
                                                <input
                                                    type="checkbox"
                                                    className="cursor-pointer"
                                                    checked={sub?.isComplete}
                                                    onChange={(event) => handleCheckboxChange(event, sub)}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

type AccordionProps = {
    items: any[];
    onApiComplete?: (success: boolean) => void;
};

const Accordion: React.FC<AccordionProps> = ({ items, onApiComplete }) => {
    const [expanded, setExpanded] = useState<number>(0);
    return (
        <>
            {items?.map((topic, index) => (
                <Collapse
                    i={index}
                    key={topic?._id}
                    topic={topic}
                    expanded={expanded}
                    setExpanded={setExpanded}
                    onComplete={onApiComplete}
                />
            ))}
        </>
    );
};

export default Accordion;
