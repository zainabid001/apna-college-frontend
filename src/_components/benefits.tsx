import Image from "next/image";
import React, { ReactElement } from "react";
import Container from "./container";

// Type definitions for bullet items
interface Bullet {
  title: string;
  desc: string;
  icon: ReactElement;
}

// Type definition for Benefits data
interface BenefitsData {
  title: string;
  desc: string;
  image: string;
  bullets: Bullet[];
}

interface BenefitsProps {
  data: BenefitsData;
  imgPos?: "left" | "right";
}

interface BenefitProps {
  title: string;
  icon: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  children: React.ReactNode;
}

export default function Benefits({ data, imgPos = "left" }: BenefitsProps) {
  return (
    <Container className="flex flex-wrap mb-20 lg:gap-10 lg:flex-nowrap ">
      <div
        className={`flex items-center justify-center w-full lg:w-1/2 ${
          imgPos === "right" ? "lg:order-1" : ""
        }`}
      >
        <div>
          <Image
            src={data.image}
            width={521}
            height={482}
            alt="Benefits"
            placeholder="blur"
            // 'layout' prop is deprecated in Next 13+, consider using 'fill' if needed
          />
        </div>
      </div>

      <div
        className={`flex flex-wrap items-center w-full lg:w-1/2 ${
          imgPos === "right" ? "lg:justify-end" : ""
        }`}
      >
        <div>
          <div className="flex flex-col w-full mt-4">
            <h3 className="max-w-2xl mt-3 text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:leading-tight lg:text-4xl dark:text-white">
              {data.title}
            </h3>

            <p className="max-w-2xl py-4 text-lg leading-normal text-gray-500 lg:text-xl xl:text-xl dark:text-gray-300">
              {data.desc}
            </p>
          </div>

          <div className="w-full mt-5">
            {data.bullets.map((item, index) => (
              <Benefit key={index} title={item.title} icon={item.icon}>
                {item.desc}
              </Benefit>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}

function Benefit({ title, icon, children }: BenefitProps) {
  return (
    <div className="flex items-start mt-8 space-x-3">
      <div className="flex items-center justify-center flex-shrink-0 mt-1 bg-indigo-500 rounded-md w-11 h-11">
        {React.cloneElement(icon, {
          className: "w-7 h-7 text-indigo-50",
        })}
      </div>
      <div>
        <h4 className="text-xl font-medium text-gray-800 dark:text-gray-200">
          {title}
        </h4>
        <p className="mt-1 text-gray-500 dark:text-gray-400">{children}</p>
      </div>
    </div>
  );
}
