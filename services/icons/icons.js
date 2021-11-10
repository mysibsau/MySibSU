import { DefaultIcon } from "./default-icon";
import React from "react";
import { useTheme } from '../../services/themes/ThemeManager'

export const BackButtonIcon = (props) => {
    const { theme } = useTheme()

    return <DefaultIcon
        image={require('../../assets/icons/back.png')}
        color={theme.blueColor}
        style={{
            paddingRight: 10,
            paddingLeft: 15
        }}
    />
}