import { Image } from "react-native";
import React from "react";


export const DefaultIcon = ({ size, image, color, style }) => {
    const defaultSize = 20
    const defaultColor = 'gray'

    return <Image
        source={image}
        style={[
            {
                width: size || defaultSize,
                height: size || defaultSize,
                tintColor: color || defaultColor,
            },
            style
        ]}
    />
}