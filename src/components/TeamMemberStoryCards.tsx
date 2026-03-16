import { useLanguage } from '../contexts/LanguageContext';

const teamMemberStoryConfig = [
  {
    key: 'sergey',
    image: '/Konstantinovich.jpeg',
    alt: 'Petrov Sergey Konstantinovich',
  },
  {
    key: 'komil',
    image: '/komil.png',
    alt: 'Komil Khaitmatov',
  },
  {
    key: 'elvira',
    image: '/elvira.png',
    alt: 'Elvira',
  },
] as const;

export default function TeamMemberStoryCards() {
  const { t } = useLanguage();

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {teamMemberStoryConfig.map((member) => {
        const story = t.about.teamMemberStories[member.key];

        return (
          <div key={member.key} className="bg-white shadow-lg overflow-hidden flex flex-col">
            <div className="h-[205px] lg:h-64 overflow-hidden">
              <img
                src={member.image}
                alt={member.alt}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-5">
              <div className="flex flex-col gap-1 mb-1 md:flex-row md:flex-wrap md:items-baseline md:justify-between md:gap-2">
                <h3 className="font-display text-xl font-medium text-[#0B0C0E]">
                  {story.name}
                </h3>
                <p className="text-[#244d85] font-medium text-sm">{story.role}</p>
              </div>
              <p className="text-xs text-gray-600 mb-2">{story.years}</p>
              <p className="text-gray-700 text-sm leading-relaxed">
                {story.text}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
