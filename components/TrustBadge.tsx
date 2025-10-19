import { Text, View } from 'react-native';

interface TrustBadgeProps {
  level: 'trusted' | 'expert' | 'starter';
  score?: number;
}

const badgeConfig = {
  trusted: {
    icon: 'shield-checkmark',
    text: 'Trusted Pro',
    emoji: '🥇',
    bgColor: 'bg-gold-accent',
    textColor: 'text-charcoal-50',
    description: '50+ jobs completed'
  },
  expert: {
    icon: 'star',
    text: 'Local Expert',
    emoji: '🥈',
    bgColor: 'bg-emerald-50',
    textColor: 'text-charcoal-50',
    description: 'Verified & experienced'
  },
  starter: {
    icon: 'leaf',
    text: 'Starter',
    emoji: '🥉',
    bgColor: 'bg-warmgrey-50',
    textColor: 'text-charcoal-50',
    description: 'New to platform'
  }
};

export default function TrustBadge({ level, score }: TrustBadgeProps) {
  const config = badgeConfig[level];
  
  return (
    <View className={`${config.bgColor} px-3 py-1 rounded-full flex-row items-center`}>
      <Text className="text-xs mr-1">{config.emoji}</Text>
      <Text className={`${config.textColor} text-xs font-bold`}>
        {config.text}
      </Text>
      {score && (
        <Text className={`${config.textColor} text-xs ml-1`}>
          {score}
        </Text>
      )}
    </View>
  );
}