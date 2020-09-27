import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 24px;
`;

export const Title = styled.Text`
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  font-size: 32px;
  margin-top: 48px;
  text-align: center;
`;

export const Description = styled.Text`
  color: #999591;
  font-family: 'RobotoSlab-Regular';
  font-size: 18px;
  margin-top: 16px;
`;

export const OkButton = styled(RectButton)`
  background-color: #ff9000;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  margin-top: 24px;
  padding: 12px 24px;
`;

export const OkButtonText = styled.Text`
  color: #312e38;
  font-family: 'RobotoSlab-Regular';
  font-size: 18px;
`;
