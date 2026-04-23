
import {Link} from "react-router";
import {useTheme} from "~/context/ThemeContext";

function NavBar() {
    const { isDark, setIsDark } = useTheme();
    return (
        <nav className={"bg-white dark:bg-black dark:bf-gray-900 border-b border-gray-200 dark:border-gray-700"}>

            {/* max-w-7xl centers content; px-4 sm:px-6 adds responsive padding */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6
               flex items-center justify-between h-16">

                {/* Brand name */}
                <span className="text-xl font-bold tracking-tighttext-gray-900 dark:text-white">MySite</span>

                {/* Links + toggle — flex row, gap-6 between items */}
                <div className="flex items-center gap-6">
                    <Link to="/dashboard"
                          className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                        Dashboard
                    </Link>
                    <Link to="/headquartersDashboard"
                          className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                        HQ Dashboard
                    </Link>

                    {/* Dark mode toggle button */}
                    <button
                        onClick={() => setIsDark(!isDark)} className="p-2 rounded-lg border border-gray-200
                      dark:border-gray-600 text-gray-600 dark:text-gray-300
                      hover:bg-gray-100 dark:hover:bg-gray-800
                      transition-colors"
                    >
                        {isDark ? "☀️" : "🌙"}
                    </button>
                </div>

            </div>
        </nav>

    );
}


export default NavBar;
