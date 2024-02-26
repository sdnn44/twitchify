import GitHubIcon from '@mui/icons-material/GitHub';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

function Footer() {
  return (
    <footer className=" py-4 px-8 flex justify-between items-center gap-2 flex-wrap bg-[#161921] flex-col lg:flex-row">
      <p className="text-sm text-white text-center order-1">Copyright © 2024 by <span className='text-violet-400 font-semibold'>slajdenXD</span> | All rights reserved.</p>
      <div className="lg:absolute lg:left-2/4 cursor-pointer hover:bg-violet-600 ease-in-out duration-300 bg-violet-500 rounded-xl p-1">
        <ArrowUpwardIcon />
      </div>
      <div className="flex items-center gap-6 order-2">
        <a className='hover:text-violet-400 ease-in-out duration-300 cursor-pointer' href='https://github.com/sdnn44/twitchify' target="_blank">
          <GitHubIcon />
        </a>
        <a className='hover:text-violet-400 ease-in-out duration-300 cursor-pointer' href='https://discord.com/invite/339426580008796160' target="_blank">
          <PersonAddAlt1Icon />
        </a>
      </div>
    </footer>
  );
}

export default Footer;