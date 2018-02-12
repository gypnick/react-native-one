import React, {Component} from 'react';
import {
    View,
    TouchableOpacity,
    ToastAndroid,
    Image,
    Text
} from 'react-native';
import {images} from "../resource"

/**
 * Created by yunpeng on
 * Desc:
 */
export default class LaudView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            select: false
        }

    }

    render() {
        return (
            <View>
                <TouchableOpacity activeOpacity={0.9} onPress={() => {
                    this._renderSelect()
                }}>
                    <Image
                        style={{height: 18, width: 18}}
                        source={
                            this.state.select ? images.bottom_laud_selected : images.bottom_laud_default
                        }
                    >
                    </Image>
                </TouchableOpacity>
            </View>

        )
    }

    _renderSelect() {
        this.setState({
            select: this.state.select ? false : true
        })
    }
}
