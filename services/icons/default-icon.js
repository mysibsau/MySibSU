import { Image } from "react-native";
import React from "react";

export default DefaultIcon = (props) => {
    const defaultSize = 20
    const defaultColor = 'gray'

    return <Image
        source={props.image}
        style={[
            {
                width: props.size || defaultSize,
                height: props.size || defaultSize,
                tintColor: props.color || defaultColor,
            },
            props.style]
        }
    />
}