import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "About Learner Always — a blog dedicated to technology and continuous learning.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">About</h1>

      <div className="prose prose-gray max-w-none">
        <p>
          <strong>Learner Always</strong> is a blog dedicated to exploring the intersection of
          technology, career growth, and the mindset of continuous learning.
        </p>

        <h2>Mission</h2>
        <p>
          The tech industry moves fast. New frameworks, tools, and paradigms emerge constantly.
          This blog exists to help navigate that landscape — breaking down complex topics into
          practical, actionable insights that you can apply to your own journey.
        </p>

        <h2>What You&apos;ll Find Here</h2>
        <ul>
          <li>Deep dives into software engineering concepts and best practices</li>
          <li>Career advice for developers at every stage</li>
          <li>Honest reviews of tools, frameworks, and technologies</li>
          <li>Reflections on the learning process itself</li>
        </ul>

        <h2>Editorial Integrity</h2>
        <p>
          Every piece of content on this blog reflects genuine experience and honest assessment.
          There are no sponsored posts, affiliate links, or paid placements. When I recommend
          something, it&apos;s because I genuinely believe it provides value.
        </p>

        <h2>Connect</h2>
        <p>
          Have questions, feedback, or topic suggestions? I&apos;d love to hear from you. The best
          way to reach me is through the channels linked in the footer.
        </p>
      </div>
    </div>
  );
}
