const Footer = () => {
  return (
    <footer className="mt-auto">
      <div className="h-fit bg-transparent pb-10 px-4 sm:px-10 xl:px-16 2xl:px-36 w-fit flex flex-col mx-auto items-center justify-center md:w-full md:flex-row md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center">
            © 2023
            <a className="hover:text-gray-900 pl-1" href="https://bose-aritra2003.github.io/my-portfolio-website/">
                Aritra Bose™
            </a>.
            All Rights Reserved.
        </span>
        <ul className="flex flex-row items-center mt-3 text-sm font-medium text-gray-500">
          <li>
            <a
              target="_blank"
              href="https://www.linkedin.com/in/bose-aritra2003/"
              className="mr-4 hover:text-gray-900 md:mr-6"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://github.com/bose-aritra2003"
              className="mr-4 hover:text-gray-900 md:mr-6"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://github.com/bose-aritra2003/together/blob/main/LICENSE"
              className="mr-4 hover:text-gray-900 md:mr-6"
            >
              Licensing
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="mailto:dev.bose.aritra@gmail.com"
              className="hover:text-gray-900"
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
export default Footer;