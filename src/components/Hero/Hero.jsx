import React from "react";
import HeroPng from "../../assets/hero.png";
import { motion } from "framer-motion";
import { SlideUp, BounceIn } from "../../animation/animateExtended";
import { FaArrowRight } from "react-icons/fa";
import { FaCode, FaRobot, FaShieldAlt } from "react-icons/fa";

const Hero = () => {
  return (
    <div className="section relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 opacity-70"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      
      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center py-24">
          {/* Text section */}
          <div className="flex flex-col space-y-8">
            <motion.h1
              variants={BounceIn(0.2)}
              initial="initial"
              animate="animate"
              className="text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500"
            >
              智鉴真言
            </motion.h1>
            <motion.p
              variants={SlideUp(0.4)}
              initial="initial"
              animate="animate"
              className="text-lg text-gray-600 leading-relaxed"
            >
              基于先进LLM技术的AI生成文本检测系统，快速准确识别AI生成内容，为学术诚信和内容真实性保驾护航。
            </motion.p>
            <div className="flex flex-col sm:flex-row gap-4 pt-8">
              <motion.button
                variants={BounceIn(0.6)}
                initial="initial"
                animate="animate"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3.5 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 font-medium"
                onClick={() => window.location.href = '/experience'}
              >
                <FaShieldAlt className="text-sm" />
                <span>开始检测</span>
                <FaArrowRight className="text-xs ml-1" />
              </motion.button>
              <motion.button
                variants={BounceIn(0.8)}
                initial="initial"
                animate="animate"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-sm font-medium px-6 py-3.5 border border-gray-200 rounded-full hover:bg-white hover:border-purple-200 transition-all duration-300 shadow-sm flex items-center gap-2 bg-white bg-opacity-50 backdrop-filter backdrop-blur-sm"
              >
                <FaCode className="text-sm" />
                <span>查看文档</span>
              </motion.button>
            </div>
          </div>
          {/* Images section */}
          <div className="flex justify-center">
            {/* 保留现有代码 */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
