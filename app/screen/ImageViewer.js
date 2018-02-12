import React, {Component} from 'react';
import {Modal} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

/**
 * Created by yunpeng on
 * Desc:
 */
export  default class ImageViewer extends Component {
    render(){
        return(
            <Modal visible={true} transparent={true}>
                <ImageViewer imageUrls={this.props.navigation.state.params.images}/>
            </Modal>
        )
    }
}