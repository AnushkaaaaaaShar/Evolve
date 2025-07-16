import { Link } from "react-router-dom";
import './Bento.css'

const Bentobox = ({
  className = "",
  title,
  text,
  icon,
  imgSrc,
  bgColor = "#e2e2e2",
  to = "/",
  children,
}) => {
  return (
    <div className={`w-full h-full ${className}`}>
      <Link to={to} className="block w-full h-full">
        <div
          className={`
            rounded-xl shadow-lg border border-white/10 
            backdrop-blur-sm transition-all 
            hover:shadow-xl hover:scale-[1.01] overflow-hidden group
            w-full h-full
          `}
          style={{ backgroundColor: bgColor }}
        >
          <div className="w-full h-full p-4 flex flex-col items-center justify-center relative">
            {imgSrc && (
              <img
                src={imgSrc}
                alt="Bento"
                className="w-[22%] h-auto mb-2 mt-4 object-cover rounded-lg group-hover:scale-105 transition-transform"
              />
            )}

            {icon && (
              <div className="text-white/70 mb-2 text-2xl group-hover:text-white transition-colors flex justify-center gap-4">
            {Array.isArray(icon) ? icon.map((i, idx) => <span key={idx}>{i}</span>) : icon}
              </div>
            )}

            {title && (
             <h3 className="text-2xl sm:text-3xl font-extrabold font-cormo text-transparent bg-clip-text bg-gradient-to-r from-black via-black-800 to-black text-center drop-shadow-md group-hover:scale-105 transition-all duration-300">
             {title}
           </h3>
           
            )}

{text && (
              <p className="text-black font-sans tracking-wide group-hover:text-white/90 transition-colors text-center text-sm">
                {text}
              </p>
            )}

            {children}

            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Bentobox;
