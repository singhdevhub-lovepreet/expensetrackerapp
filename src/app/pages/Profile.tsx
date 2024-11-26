import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import CustomText from '../components/CustomText';
import { UserDto } from './dto/UserDto';
import { theme } from '../theme/theme';
import { Icon } from '@gluestack-ui/themed';
import { Camera, ChevronRight, User, Phone, Mail, Bell, Lock, Moon } from 'lucide-react-native';

const mockUser: UserDto = {
  userId: '12345',
  firstName: 'John',
  lastName: 'Doe',
  phoneNumber: 1234567890,
  email: 'john.doe@example.com',
  profilePic: 'https://i.pravatar.cc/300',
};

interface ProfileItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const ProfileItem: React.FC<ProfileItemProps> = ({ icon, label, value }) => (
  <View style={styles.profileItem}>
    <View style={styles.iconContainer}>
      {icon}
    </View>
    <View style={styles.itemContent}>
      <CustomText style={styles.label}>{label}</CustomText>
      <CustomText style={styles.value}>{value}</CustomText>
    </View>
    <Icon as={ChevronRight} color={theme.colors.text.secondary} size="sm" />
  </View>
);

const Profile = () => {
  const formatPhoneNumber = (phone: number): string => {
    const phoneStr = phone.toString();
    return `(${phoneStr.slice(0, 3)}) ${phoneStr.slice(3, 6)}-${phoneStr.slice(6)}`;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileImageContainer}>
          <Image
            source={{ uri: mockUser.profilePic }}
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.editButton}>
            <Icon as={Camera} color={theme.colors.primary} size="sm" />
          </TouchableOpacity>
        </View>
        <CustomText style={styles.name}>
          {mockUser.firstName} {mockUser.lastName}
        </CustomText>
        <CustomText style={styles.userId}>ID: {mockUser.userId}</CustomText>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <CustomText style={styles.sectionTitle}>Personal Information</CustomText>
          <View style={styles.card}>
            <ProfileItem
              icon={<Icon as={User} color={theme.colors.primary} size="sm" />}
              label="Name"
              value={`${mockUser.firstName} ${mockUser.lastName}`}
            />
            <ProfileItem
              icon={<Icon as={Phone} color={theme.colors.primary} size="sm" />}
              label="Phone"
              value={formatPhoneNumber(mockUser.phoneNumber)}
            />
            <ProfileItem
              icon={<Icon as={Mail} color={theme.colors.primary} size="sm" />}
              label="Email"
              value={mockUser.email}
            />
          </View>
        </View>

        <View style={styles.section}>
          <CustomText style={styles.sectionTitle}>Settings</CustomText>
          <View style={styles.card}>
            <ProfileItem
              icon={<Icon as={Bell} color={theme.colors.primary} size="sm" />}
              label="Notifications"
              value="On"
            />
            <ProfileItem
              icon={<Icon as={Lock} color={theme.colors.primary} size="sm" />}
              label="Privacy"
              value="View Settings"
            />
            <ProfileItem
              icon={<Icon as={Moon} color={theme.colors.primary} size="sm" />}
              label="Dark Mode"
              value="System"
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
  header: {
    alignItems: 'center',
    paddingVertical: theme.spacing['2xl'],
    backgroundColor: theme.colors.surface.primary,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.effects.glass.borderColor,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: theme.spacing.lg,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: theme.colors.primary,
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: theme.colors.surface.secondary,
    borderRadius: theme.borderRadius.full,
    padding: theme.spacing.sm,
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  name: {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  userId: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
  },
  content: {
    padding: theme.spacing.lg,
  },
  section: {
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
    marginLeft: theme.spacing.sm,
  },
  card: {
    backgroundColor: theme.colors.surface.primary,
    borderRadius: theme.borderRadius.lg,
    ...Platform.select({
      ios: {
        shadowColor: theme.colors.effects.shadow.medium.color,
        shadowOffset: theme.colors.effects.shadow.medium.offset,
        shadowOpacity: theme.colors.effects.shadow.medium.opacity,
        shadowRadius: theme.colors.effects.shadow.medium.radius,
      },
      android: {
        elevation: 4,
      },
    }),
    borderWidth: 1,
    borderColor: theme.colors.effects.glass.borderColor,
  },
  profileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.effects.glass.borderColor,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.surface.elevated,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  itemContent: {
    flex: 1,
  },
  label: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
    marginBottom: 2,
  },
  value: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text.primary,
    fontWeight: theme.typography.fontWeight.medium,
  },
});

export default Profile;
