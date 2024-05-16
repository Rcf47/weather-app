import { github } from "@/app/utils/icons";

function Footer() {
  return (
    <footer className="py-4 flex justify-center pb-8 ">
      <p className="footer-text text-sm flex items-center gap-1">
        Made by {github}
        <a
          href="https://github.com/Rcf47"
          target="_blank"
          rel="noreferrer"
          className="text-green-300 font-bold"
        >
          Vadim
        </a>
      </p>
    </footer>
  );
}

export default Footer;
