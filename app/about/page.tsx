import {
  Link2,
  Zap,
  ShieldCheck,
  CheckCircle2,
  Sliders,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  const values = [
    {
      icon: Zap,
      title: "Speed",
      description:
        "We optimize for milliseconds. Our global infrastructure ensures that every redirection is instantaneous, no matter where your audience is located.",
      colorClass: "text-primary",
      bgClass: "bg-primary/10",
    },
    {
      icon: ShieldCheck,
      title: "Security",
      description:
        "Trust is our currency. We employ enterprise-grade encryption and advanced threat detection to protect your data and your users' privacy.",
      colorClass: "text-secondary",
      bgClass: "bg-secondary/10",
    },
    {
      icon: Sliders,
      title: "Simplicity",
      description:
        "We strip away the noise. Our interface is designed to be intuitive and powerful, allowing you to focus on what matters: your content.",
      colorClass: "text-tertiary-container",
      bgClass: "bg-tertiary-container/10",
    },
  ];

  const culturePoints = [
    "Fully remote and globally distributed.",
    "Passionate about UX and performance.",
    "Constantly iterating on the future of links.",
  ];

  return (
    <main className=" text-on-surface selection:bg-primary-fixed-dim selection:text-on-primary-fixed min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-purple-50 to-indigo-50 relative overflow-hidden border-b border-outline-variant pt-20 pb-28 px-margin-mobile md:px-margin-desktop">
        <div className="max-w-container-max mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container border border-outline-variant rounded-full font-label-sm text-label-sm text-primary">
            <Link2 className="h-3.5 w-3.5" />
            <span>About CrixLink</span>
          </div>

          <h1 className="font-display-lg text-display-lg text-on-surface max-w-4xl mx-auto leading-tight">
            Simplify the way the world shares and tracks{" "}
            <span className="text-primary font-extrabold">information</span>.
          </h1>

          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            Our mission is to make every link count, one redirection at a time,
            with precision metrics and high-performance edge infrastructure.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 px-margin-mobile md:px-margin-desktop">
        <div className="max-w-container-max mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
            <div className="lg:col-span-7 space-y-6">
              <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
                Our Story
              </h2>
              <div className="space-y-4 font-body-md text-body-md text-on-surface-variant leading-relaxed">
                <p>
                  What started as a simple experiment in URL shortening has
                  evolved into a precision-engineered platform trusted by
                  millions of creators and global enterprises.
                </p>
                <p>
                  We realized that a link is more than just a destination; it's
                  a bridge between an idea and its audience. In a world of
                  fragmented information, we set out to build a tool that brings
                  clarity, speed, and intelligence to every click.
                </p>
                <p>
                  Today, CrixLink serves as the connective tissue of the modern
                  web, providing deep insights and seamless performance at
                  scale.
                </p>
              </div>
            </div>
            <div className="lg:col-span-5 h-[340px] md:h-[400px] rounded-3xl overflow-hidden border border-outline-variant relative group">
              <img
                src="https://i.pinimg.com/1200x/93/47/a1/9347a12f7d97d1f0ab263f778a77ef66.jpg"
                alt="CrixLink team working together"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-24 bg-surface-container-low px-margin-mobile md:px-margin-desktop">
        <div className="max-w-container-max mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
              Our Values
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-lg mx-auto">
              The core principles guiding our engineering, design, and product
              decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {values.map((val) => {
              const Icon = val.icon;
              return (
                <div
                  key={val.title}
                  className="bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant hover:border-primary transition-colors duration-300 group"
                >
                  <div
                    className={`w-12 h-12 ${val.bgClass} rounded-xl flex items-center justify-center mb-6 ${val.colorClass} group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface mb-4 font-bold">
                    {val.title}
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    {val.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Culture */}
      <section className="py-24 px-margin-mobile md:px-margin-desktop">
        <div className="max-w-container-max mx-auto">
          <div className="bg-indigo-400 border border-outline-variant rounded-[2.5rem] p-8 md:p-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
                Our Culture
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                We are a team of developers, designers, and dreamers committed
                to the modern web. We believe in open standards, elegant code,
                and the power of collaboration.
              </p>
              <div className="lg:col-span-6 space-y-4">
                {culturePoints.map((point) => (
                  <div
                    key={point}
                    className="flex items-start gap-4 p-2  rounded-2xl"
                  >
                    <CheckCircle2 className="h-6 w-6 text-tertiary shrink-0 mt-0.5" />
                    <span className="font-body-md text-body-md text-on-surface font-medium">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative w-[500px] h-[320px] mx-auto">
                <Image
                  src="/about-team1.jpg"
                  alt="CrixLink team collaborating"
                  fill
                  className="rounded-3xl object-cover border border-outline-variant"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {/* <section className="py-24 px-margin-mobile md:px-margin-desktop text-center bg-inverse-surface text-inverse-on-surface rounded-t-[4rem] flex flex-col justify-center items-center">
        <div className="max-w-2xl mx-auto space-y-8">
          <h2 className="font-display-lg text-display-lg font-bold">
            Join the mission
          </h2>
          <p className="font-body-lg text-body-lg opacity-80 max-w-xl mx-auto">
            Start shortening, tracking, and optimizing your links today. Experience the power of precision.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto pt-4">
            <Link
              href="/dashboard"
              className="w-full sm:w-auto bg-primary-container text-on-primary-container px-10 py-4 rounded-xl font-headline-sm hover:scale-105 active:scale-95 transition-transform duration-200 font-bold flex items-center justify-center gap-2"
            >
              Get Started Free
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section> */}
    </main>
  );
}
