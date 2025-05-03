import React from "react";
import { motion } from "framer-motion";
import { SlideUp, FadeIn, ScaleUp, BounceIn } from "../../animation/animateExtended";
import { FaArrowRight, FaFileUpload, FaRobot, FaListAlt } from "react-icons/fa";

// 模拟数据 - 产品使用流程
const flowSteps = [
  {
    id: 1,
    title: "上传文本",
    description: "上传或粘贴需要检测的文本内容",
    icon: <FaFileUpload className="text-xl" />,
    color: "from-purple-400 to-blue-400",
  },
  {
    id: 2,
    title: "选择模式",
    description: "选择检测模式和参数设置",
    icon: <FaListAlt className="text-xl" />,
    color: "from-blue-400 to-indigo-400",
  },
  {
    id: 3,
    title: "AI分析",
    description: "AI自动分析文本真伪",
    icon: <FaRobot className="text-xl" />,
    color: "from-indigo-400 to-purple-400",
  },
];

// 修改模拟用户输入和AI响应
const userGoal = "我想检测这段文本是否由AI生成";
const aiResponse = {
  title: "AI生成文本检测结果",
  summary: "该文本有98.7%的概率为AI生成，检测到典型的GPT-4语言模式特征。",
  keyPoints: [
    "词汇多样性得分：0.76（AI特征）",
    "句法复杂度：0.82（AI特征）",
    "语义连贯性：0.91（人类特征）",
    "表达一致性：0.95（AI特征）",
  ],
  recommendations: "建议进一步人工审核或要求提供创作过程证明。",
};
const AIFlow = () => {
  return (
    <div className="bg-gray-50 py-32 w-full relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute top-20 -right-40 w-80 h-80 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute -bottom-40 left-20 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      
      <div className="container">
        {/* 标题区域 */}
        <div className="flex flex-col justify-center items-center mb-20 text-center max-w-3xl mx-auto">
          <motion.div
            variants={FadeIn(0.1)}
            initial="initial"
            whileInView="animate"
            className="inline-block px-4 py-1.5 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full mb-6"
          >
            <span className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">智能检测 · 简单操作</span>
          </motion.div>
          <motion.h2
            variants={SlideUp(0.2)}
            initial="initial"
            whileInView="animate"
            className="text-4xl md:text-5xl font-bold mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600"
          >
            如何使用智鉴真言
          </motion.h2>
          <motion.div
            variants={SlideUp(0.3)}
            initial="initial"
            whileInView="animate"
            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-6"
          >
            <p>三步轻松完成AI生成文本的智能检测，让鉴别更高效</p>
          </motion.div>
        </div>

        {/* 流程展示区域 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {flowSteps.map((step, index) => (
            <motion.div
              key={step.id}
              variants={ScaleUp(0.3 + index * 0.1)}
              initial="initial"
              whileInView="animate"
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm transition-all duration-300 relative overflow-hidden group"
            >
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${step.color} transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r ${step.color} text-white`}>
                  {step.icon}
                </div>
                <div className="text-xl font-bold">{step.title}</div>
              </div>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>

        {/* 交互式演示区域 */}
        <motion.div
          variants={FadeIn(0.5)}
          initial="initial"
          whileInView="animate"
          className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden max-w-4xl mx-auto"
        >
          {/* 命令行风格的头部 */}
          <div className="bg-gray-800 px-4 py-3 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <div className="text-white text-sm ml-2">SmartPaper AI 分析</div>
          </div>

          {/* 用户输入区域 */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 flex-shrink-0">
                <span className="text-sm">用户</span>
              </div>
              <div className="flex-1">
                <motion.div
                  variants={BounceIn(0.2)}
                  initial="initial"
                  whileInView="animate"
                  className="typewriter-text font-mono text-gray-800 bg-gray-50 p-4 rounded-lg"
                >
                  <span className="text-gray-400">Your Goal:</span>
                  <br />
                  {userGoal}
                </motion.div>
              </div>
            </div>
          </div>

          {/* AI响应区域 */}
          <div className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white flex-shrink-0">
                <FaRobot className="text-sm" />
              </div>
              <div className="flex-1">
                <motion.div
                  variants={SlideUp(0.3)}
                  initial="initial"
                  whileInView="animate"
                  className="bg-gray-50 p-6 rounded-lg"
                >
                  <h3 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
                    {aiResponse.title}
                  </h3>
                  <div className="mb-4">
                    <p className="text-gray-700">{aiResponse.summary}</p>
                  </div>
                  <div className="mb-4">
                    <h4 className="font-bold mb-2">关键点：</h4>
                    <ul className="space-y-1">
                      {aiResponse.keyPoints.map((point, index) => (
                        <motion.li
                          key={index}
                          variants={FadeIn(0.4 + index * 0.1)}
                          initial="initial"
                          whileInView="animate"
                          className="flex items-center gap-2"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"></div>
                          <span>{point}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">建议：</h4>
                    <p className="text-gray-700">{aiResponse.recommendations}</p>
                  </div>
                </motion.div>
                <motion.div
                  variants={FadeIn(0.6)}
                  initial="initial"
                  whileInView="animate"
                  className="mt-4 flex justify-end"
                >
                  <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full text-sm flex items-center gap-2 hover:shadow-md transition-all duration-300">
                    <span>继续分析</span>
                    <FaArrowRight className="text-xs" />
                  </button>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AIFlow;