import { Timestamp } from '@react-native-firebase/firestore/lib/modular/Timestamp';

export interface Message {
  content: string;
  sentBy: string;
  sentAt: Timestamp;
}
