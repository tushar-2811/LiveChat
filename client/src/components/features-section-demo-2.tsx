import { cn } from "@/lib/utils";
import {
  IconAdjustmentsBolt,
  IconBellRinging,
  IconBrain,
  IconCloud,
  IconCurrencyDollar,
  IconEaseInOut,
  IconHeart,
  IconHelp,
  IconMessageDots,
  IconPhotoPlus,
  IconRouteAltLeft,
  IconShieldLock,
  IconTerminal2,
  IconUsers,
} from "@tabler/icons-react";

export default function FeaturesSectionDemo() {
const features = [
  {
    title: "Real-time Messaging",
    description:
      "Experience lightning-fast conversations powered by WebSockets — no delays, no reloads.",
    icon: <IconMessageDots />,
  },
  {
    title: "Simple & Intuitive UI",
    description:
      "Clean, modern, and built for humans. Start chatting instantly without any learning curve.",
    icon: <IconEaseInOut />,
  },
  {
    title: "Secure by Design",
    description:
      "Your chats are end-to-end encrypted and stored safely — privacy comes standard.",
    icon: <IconShieldLock />,
  },
  {
    title: "Always Online",
    description:
      "ChatX is always ready when you are. 99.9% uptime means your messages never miss a beat.",
    icon: <IconCloud />,
  },
  {
    title: "Media Sharing",
    description:
      "Send photos, videos, and files effortlessly — your conversations just got richer.",
    icon: <IconPhotoPlus />,
  },
  {
    title: "Smart Notifications",
    description:
      "Get instant alerts that actually matter — no spam, no distractions.",
    icon: <IconBellRinging />,
  },
  {
    title: "Powered by AI",
    description:
      "From smart replies to sentiment cues, ChatX uses AI to make chatting feel natural.",
    icon: <IconBrain />,
  },
  {
    title: "Built for Everyone",
    description:
      "From friends to teams, ChatX adapts to the way you communicate — simple, seamless, and fun.",
    icon: <IconUsers />,
  },
];

  return (
   <div className="my-40 ">
   <div className="flex justify-center text-6xl font-medium ">Features of ChatX</div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  relative z-10 py-10 max-w-7xl mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
   </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r  py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};
