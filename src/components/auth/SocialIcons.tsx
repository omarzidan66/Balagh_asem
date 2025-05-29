
import { Facebook, Twitter, Linkedin } from "lucide-react";

interface SocialIconsProps {
  className?: string;
}

const SocialIcons = ({ className }: SocialIconsProps) => {
  return (
    <div className={`social-container ${className || ""}`}>
      <a href="#" aria-label="Facebook"><Facebook size={16} /></a>
      <a href="#" aria-label="Twitter"><Twitter size={16} /></a>
      <a href="#" aria-label="LinkedIn"><Linkedin size={16} /></a>
    </div>
  );
};

export default SocialIcons;
