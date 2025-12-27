export function AboutSection() {
    return (
        <section className="relative w-full py-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Left Column: Heading & Stats */}
                <div className="space-y-8">
                    <div>
                        <h3 className="text-sm text-zinc-500 font-mono tracking-widest uppercase border-b border-white/10 pb-2 mb-4">
                            Identity Verification
                        </h3>
                        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                            A systems thinker building for the{" "}
                            <span className="text-blue-500">web</span> and{" "}
                            <span className="text-purple-500">infrastructure</span>.
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl border border-white/10 bg-zinc-900/30">
                            <div className="text-2xl font-bold text-white mb-1">3+</div>
                            <div className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">
                                Years Experience
                            </div>
                        </div>
                        <div className="p-4 rounded-xl border border-white/10 bg-zinc-900/30">
                            <div className="text-2xl font-bold text-white mb-1">7+</div>
                            <div className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">
                                Projects Deployed
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Bio */}
                <div className="space-y-6 text-zinc-400 leading-relaxed text-sm md:text-base">
                    <p>
                        I operate at the convergence of <strong>Next.js architecture</strong> and <strong>bare-metal infrastructure</strong>.
                    </p>
                    <p>
                        My expertise was forged at <span className="text-white">BT Technologies</span>, transitioning from
                        managing physical server racks and Fortinet firewalls to orchestrating containerized
                        ERP environments.
                    </p>
                    <p>
                        I build applications that are visually stunning and operationally resilient—controlling
                        the stack from the React component down to the Docker container.
                    </p>
                </div>
            </div>
        </section>
    );
}
