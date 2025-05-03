import React, { useState, useEffect } from "react";
import Logo from "../../assets/book.png";
import { motion } from "framer-motion";
import { FaHome, FaHistory, FaBook, FaCode, FaUsers } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { HiMenuAlt4, HiX } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";

// 导航链接配置
const NavLinks = [
  {
    id: 1,
    title: "主页",
    link: "/",
    icon: <FaHome className="text-lg" />,
  },
  {
    id: 2,
    title: "检测工具",
    link: "/experience",
    icon: <FiSearch className="text-lg" />,
  },
  {
    id: 3,
    title: "检测历史",
    link: "/history",
    icon: <FaHistory className="text-lg" />,
  },
  {
    id: 4,
    title: "技术文档",
    link: "/documentation",
    icon: <FaBook className="text-lg" />,
  },
  {
    id: 5,
    title: "API接口",
    link: "#",
    icon: <FaCode className="text-lg" />,
  },
  {
    id: 6,
    title: "关于我们",
    link: "#",
    icon: <FaUsers className="text-lg" />,
  },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  // 监听滚动事件，添加背景色
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <>
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-white/85 backdrop-blur-md shadow-sm' 
            : 'bg-white/75 backdrop-blur-sm'
        }`}
      >
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo section */}
          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Link to="/" className="flex items-center">
              <img src={Logo} alt="logo" className="w-7 h-7" />
              <span className="text-lg font-semibold ml-2 text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-blue-600">智鉴真言</span>
            </Link>
          </motion.div>
          
          {/* Desktop Link section */}
          <div className="hidden md:flex items-center">
            {NavLinks.map((link) => {
              const isActive = location.pathname === link.link;
              
              return (
                <motion.div 
                  key={link.id} 
                  className="relative mx-3"
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  {link.link.startsWith('http') || link.link === '#' ? (
                    <a
                      href={link.link}
                      className="flex items-center text-sm text-gray-600 hover:text-purple-600 transition-colors duration-200 py-2 px-2 font-medium"
                      target={link.link.startsWith('http') ? "_blank" : "_self"}
                      rel={link.link.startsWith('http') ? "noopener noreferrer" : ""}
                    >
                      <span className="mr-1.5 text-gray-500">{link.icon}</span>
                      {link.title}
                    </a>
                  ) : (
                    <Link
                      to={link.link}
                      className={`flex items-center text-sm transition-colors duration-300 py-2 px-2 font-medium ${
                        isActive 
                          ? 'text-purple-600' 
                          : 'text-gray-600 hover:text-purple-600'
                      }`}
                    >
                      <span className={`mr-1.5 ${isActive ? 'text-purple-600' : 'text-gray-500'}`}>{link.icon}</span>
                      {link.title}
                      {isActive && (
                        <motion.div 
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                          layoutId="navIndicator"
                        ></motion.div>
                      )}
                    </Link>
                  )}
                </motion.div>
              );
            })}
          </div>
          
          {/* 登录/注册按钮 */}
          <div className="hidden md:block">
            <Link to="/auth">
              <motion.button
                className="px-5 py-1.5 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-white text-sm font-medium shadow-sm hover:shadow-md"
                whileHover={{ scale: 1.03, boxShadow: "0 4px 12px rgba(124, 58, 237, 0.2)" }}
                whileTap={{ scale: 0.97 }}
              >
                登录 / 注册
              </motion.button>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
              whileTap={{ scale: 0.9 }}
            >
              {mobileMenuOpen ? <HiX size={24} /> : <HiMenuAlt4 size={24} />}
            </motion.button>
          </div>
        </div>
      </motion.div>
      
      {/* Mobile menu */}
      <motion.div 
        className={`fixed inset-0 z-40 bg-white/95 backdrop-blur-md transform ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out md:hidden`}
        style={{ top: '60px' }}
        initial={false}
      >
        <div className="p-4 space-y-2">
          {NavLinks.map((link) => {
            const isActive = location.pathname === link.link;
            
            return (
              <motion.div 
                key={link.id} 
                className="py-2.5 border-b border-gray-100"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                {link.link.startsWith('http') || link.link === '#' ? (
                  <a
                    href={link.link}
                    className="flex items-center text-base text-gray-800 hover:text-purple-600 transition-colors duration-200"
                    target={link.link.startsWith('http') ? "_blank" : "_self"}
                    rel={link.link.startsWith('http') ? "noopener noreferrer" : ""}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="mr-3 text-gray-500">{link.icon}</span>
                    {link.title}
                  </a>
                ) : (
                  <Link
                    to={link.link}
                    className={`flex items-center text-base transition-colors duration-200 ${
                      isActive ? 'text-purple-600 font-medium' : 'text-gray-800 hover:text-purple-600'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className={`mr-3 ${isActive ? 'text-purple-600' : 'text-gray-500'}`}>{link.icon}</span>
                    {link.title}
                  </Link>
                )}
              </motion.div>
            );
          })}
          
          {/* 移动端登录按钮 */}
          <Link to="/auth" className="w-full block mt-6">
            <motion.button
              className="w-full px-4 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 text-white text-base font-medium shadow-sm"
              onClick={() => setMobileMenuOpen(false)}
              whileTap={{ scale: 0.98 }}
            >
              登录 / 注册
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </>
  );
};

export default Navbar;
