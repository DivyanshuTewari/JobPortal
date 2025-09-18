import React from "react";
import { Facebook, Linkedin, Instagram, Github } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-pink-500 via-red-500 to-purple-600 text-white py-10 mt-20">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-0">
          <div className="text-2xl font-bold">
            Hire<span className="text-yellow-300">Sphere</span>
          </div>

          <div className="text-center text-sm text-white/80">
            © {new Date().getFullYear()} HireSphere. All Rights Reserved. <br/> Created by <span className="text-yellow-300">Divyanshu Tewari</span>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4">
            
            <a href="https://www.github.com/DivyanshuTewari" target="_blank" rel="noreferrer">
              <Github className="w-5 h-5 hover:scale-110 transition" />
            </a>
            <a href="https://www.linkedin.com/in/divyanshu-tewari" target="_blank" rel="noreferrer">
              <Linkedin className="w-5 h-5 hover:scale-110 transition" />
            </a>
            <a href="https://www.instagram.com/_i_divyanshu" target="_blank" rel="noreferrer">
              <Instagram className="w-5 h-5 hover:scale-110 transition" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
