import BlogAside from "../../Blog view/BlogAside"
import GadgetsAndElectronics from "../Categories/GadgetsAndElectronics"
import GamingAndEntertainment from "../Categories/GamingAndEntertainment"
import HowTo from "../Categories/HowTo"
import ProgrammingAndDevelopment from "../Categories/ProgrammingAndDevelopment"
import SoftwareAndApps from "../Categories/SoftwareAndApps"
import TechNews from "../Categories/TechNews"
import RecentPosts from "../Recent posts/RecentPosts"


const SectionDivider = () => {
    return <div className="grid lg:grid-cols-3 gap-10 container mx-auto">

        <div className="lg:col-span-2">
            <RecentPosts />
            <GadgetsAndElectronics />
            <SoftwareAndApps />
            <HowTo />
            <TechNews />
            <ProgrammingAndDevelopment />
            <GamingAndEntertainment />
        </div>

        <div>
            <BlogAside />
        </div>



    </div>
}

export default SectionDivider