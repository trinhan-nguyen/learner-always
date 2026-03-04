import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "About Learner Always — a blog dedicated to technology and continuous learning.",
};

export default function AboutPage() {
  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">About</h1>

      <div className="prose prose-gray max-w-none">
        <p>
          Hey, I&apos;m Nhan — a software engineer at Meta based in New York.
          I graduated from the University of Waterloo and have been building
          software across mobile and backend ever since.
        </p>

        <p>
          I started this blog because I kept running into topics that I wished
          someone had explained more clearly: why you should call external APIs from
          your backend instead of the client, or what really happens when an ATS
          scans your resume.
        </p>

        <p>
          So I write the posts I wish I&apos;d found. Some are hands-on tutorials (like
          building a stock portfolio endpoint in Ktor from scratch), some are career
          advice drawn from real experience interviewing and reviewing resumes, and some
          are just me working through ideas about productivity, finance, or what makes
          mobile development its own beast.
        </p>

        <p>
          No sponsors, no affiliate links — just things I genuinely find useful or
          interesting.
        </p>

        <p>
          If you want to get in touch, you can find me on{" "}
          <a href="https://github.com/trinhan-nguyen">GitHub</a> or{" "}
          <a href="https://www.linkedin.com/in/trinhan-nguyen/">LinkedIn</a>.
        </p>
      </div>
    </div>
  );
}
