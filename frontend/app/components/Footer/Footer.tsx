import GitHubIcon from '@mui/icons-material/GitHub';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

function Footer() {
  return (
    <footer className="sm:px-16 py-4 px-8 flex justify-between items-center gap-2 flex-wrap bg-[#161921]">
      <p className="text-base font-bold text-white">@2024 slajdenXD</p>
      <ArrowUpwardIcon />
      <div className="flex items-center gap-6">
        <GitHubIcon />
        <PersonAddAlt1Icon />
      </div>
    </footer>
  );
}

export default Footer;