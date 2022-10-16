import { ThemeWithAnyProps } from '@samurais-app/components';
import { complementaryColor } from '@frade-sam/samtools';
import styled from 'styled-components';
import logo from '../../assets/logo.png';
import { layoutExtendsMarginLeft } from './function';

export interface ApplicationProps {
  top?: number
}

export interface ApplicationLogoTextProps {
  version?: string;
}

export const Application = styled.div<ApplicationProps>`
  width: 100vw;
  min-height: 100vh;
  color: ${(props: ThemeWithAnyProps<any>) => complementaryColor(props.theme.color.background)};
`;

export const ApplicationLogoBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const ApplicationLogo = styled.b`
  display: inline-block;
  width: 40px;
  height: 40px;
  background-image: url(${logo});
  background-size: cover;
  background-repeat: no-repeat;
`;

export const ApplicationLogoText = styled.span<ThemeWithAnyProps<ApplicationLogoTextProps>>`
  display: inline-block;
  font-size: ${(props:ThemeWithAnyProps<ApplicationLogoTextProps>) => `${props.theme.spacing.fontSize[3]}${props.theme.unit}`};
  margin-left: ${(props:ThemeWithAnyProps<ApplicationLogoTextProps>) => `${props.theme.spacing.spacing[1]}${props.theme.unit}`};
  &:after {
    background-color: ${(props: ThemeWithAnyProps<ApplicationLogoTextProps>) => complementaryColor(props.theme.color.background)};
    color: ${(props:ThemeWithAnyProps<ApplicationLogoTextProps>) => props.theme.color.background};
    content: '${(props:ThemeWithAnyProps<ApplicationLogoTextProps>) => props.version ? props.version : ''}';
    display: '${(props:ThemeWithAnyProps<ApplicationLogoTextProps>) => props.version ? 'block' : 'none'}';
    border-radius: ${(props:ThemeWithAnyProps<ApplicationLogoTextProps>) => `${props.theme.Size(props.theme.spacing.radius[0])}${props.theme.unit}`};
    font-size: ${(props:ThemeWithAnyProps<ApplicationLogoTextProps>) => `${props.theme.spacing.fontSize[0]}${props.theme.unit}`};
    margin-left: ${(props:ThemeWithAnyProps<ApplicationLogoTextProps>) => `${props.theme.Size(props.theme.spacing.spacing[1])}${props.theme.unit}`};
    padding: ${(props:ThemeWithAnyProps<ApplicationLogoTextProps>) => `0${props.theme.unit} ${props.theme.Size(props.theme.spacing.spacing[0])}${props.theme.unit}`};
  }
`;
export const ApplicationExtends = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: ${layoutExtendsMarginLeft};
`;