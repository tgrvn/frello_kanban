import {ReactNode} from "react";
import logo from "@/shared/assets/logo.svg";
import {useLocation} from "react-router";
import {motion, AnimatePresence} from "framer-motion";

const AuthLayout = ({children}: { children: ReactNode }) => {
    const location = useLocation();

    return (
        <div className={"h-screen relative"}>
            <div className={"absolute flex items-center auth-bg top-0 left-0 w-full h-full"}>
                <motion.div
                    layout
                    transition={{layout: {duration: 0.2}}}
                    className={"h-max flex-1 mx-auto max-w-sm p-10 rounded bg-white"}>

                    <motion.div layout={"position"}
                                className={"flex items-center justify-center gap-2 pointer-events-none"}>
                        <img src={logo} className={"h-[48px]"} alt=""/>
                        <h2 className={"text-2xl font-black"}>Frello Kanban</h2>
                    </motion.div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={location.pathname}
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            transition={{duration: 0.5, delay: 0.1}}
                        >
                            <div className={"mt-6"}>
                                {children}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>

    )
}
export default AuthLayout
