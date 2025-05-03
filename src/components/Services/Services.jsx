import React from "react";
import { FaVectorSquare, FaArrowRight } from "react-icons/fa";
import { FaPenToSquare } from "react-icons/fa6";
import { BiSolidDollarCircle } from "react-icons/bi";
import { motion } from "framer-motion";
import { SlideUp, BounceIn, hoverScale } from "../../animation/animateExtended";

const ServiceCard = [
  {
    id: 1,
    title: "智能检测",
    description:
      "使用先进的LLM技术自动分析文本特征，精准识别AI生成内容，准确率高达95%以上",
    icon: <FaVectorSquare />,
    link: "#",
    delay: 0.2,
  },
  {
    id: 2,
    title: "多种模式",
    description:
      "支持多种检测模式，包括文本相似度分析、语言模型特征识别和语义连贯性评估",
    icon: <FaPenToSquare />,
    link: "#",
    delay: 0.4,
  },
  {
    id: 3,
    title: "免费使用",
    description:
      "完全开源免费，无需注册，只需输入待检测文本即可立即获得分析结果",
    icon: <BiSolidDollarCircle />,
    link: "#",
    delay: 0.6,
  },
];
const Services = () => {
  return (
    <div className="relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute top-40 right-0 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute bottom-20 left-10 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      
      <div className="container py-28 relative z-10">
        {/* heading title */}
        <div className="space-y-4 text-center max-w-[600px] mx-auto mb-16">
          <motion.div
            variants={BounceIn(0.1)}
            initial="initial"
            whileInView={"animate"}
            className="inline-block px-4 py-1.5 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full mb-4"
          >
            <span className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">功能特点</span>
          </motion.div>
          <motion.h1
            variants={BounceIn(0.2)}
            initial="initial"
            whileInView={"animate"}
            className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600"
          >
            我们的检测服务
          </motion.h1>
          <motion.p
            variants={SlideUp(0.3)}
            initial="initial"
            whileInView={"animate"}
            className="text-gray-600 text-lg"
          >
            使用先进的LLM技术，让AI生成内容检测变得更加简单高效
          </motion.p>
        </div>
        {/* card section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ServiceCard.map((card) => {
            return (
              <motion.div
                variants={SlideUp(card.delay)}
                initial="initial"
                whileInView={"animate"}
                whileHover={{ y: -8, boxShadow: "0 15px 30px -5px rgba(0, 0, 0, 0.1)" }}
                key={card.id}
                className="card p-8 space-y-4"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 flex justify-center items-center text-xl text-purple-600">
                  {card.icon}
                </div>
                <h1 className="text-xl font-semibold">{card.title}</h1>
                <p className="text-gray-500 text-sm leading-7">{card.description}</p>
                <a
                  href={card.link}
                  className="flex items-center gap-2 text-sm font-medium text-purple-600"
                >
                  了解更多 <FaArrowRight />
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Services;
