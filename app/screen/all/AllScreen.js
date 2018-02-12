import React, {Component} from 'react';
import {
    View,
    Text,
    FlatList,
    Dimensions,
    ScrollView,
    RefreshControl

} from 'react-native';
import {TitleBar, BannerView} from "../../components";
import {images, constants} from "../../resource"
import ImageButton from "../../components/ImageButton";
/**
 * Created by yunpeng on
 * Desc:
 */
export default class AllScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            headBanner: [],
            contentJson: [],
            author: [],
            selectAuthor: [],
            centerBanner: [],
            isRefreshing: false
        }
    }

    render() {
        return (
            <View>
                <TitleBar
                    titleText={"ONE      IS      ALL"}
                />

                        <FlatList
                            ListHeaderComponent={this._renderHeadBanner}
                            data={this.state.contentJson}
                            renderItem={({item}) => this._renderListItem(item)}
                            ItemSeparatorComponent={this._separator}
                            //设置下拉刷新控件
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.isRefreshing}
                                    //刷新时调用这个方法
                                    onRefresh={() => {
                                        this.fetchData();
                                    }
                                    }
                                >
                                </RefreshControl>
                            }
                        />
            </View>
        )

    }

    /**
     * 返回中间banner
     * @returns {Array}
     * @private
     */
    _renderCenterBanner() {
        let result = [];
        let item = this.state.centerBanner;
        for (let i = 0; i < item.length; i++) {
            result.push(
                <View key={i} style={{
                    flex: 1, justifyContent: "center",
                    alignItems: "center",height:120,backgroundColor:"#fff",marginHorizontal:10,paddingVertical:10
                }}>
                    <ImageButton
                        defaultSource={images.defaultPic}
                        source={{uri: this.state.centerBanner[i].cover}}
                        style={{width: 2*Dimensions.get("window").width/3, height: 100,justifyContent: "center",
                            alignItems: "center"}}
                    >
                        <Text style={{position: "absolute",left:-25,top:10,width:80,paddingLeft:5,textAlign:"center",backgroundColor:"#f00",color:"#fff",transform:[{rotateZ:"-45deg"}]}}>专题</Text>
                        <Text style={{color:"#fff"}}>{this.state.centerBanner[i].title}</Text>
                    </ImageButton>

                </View>
            )
        }
        return result;
    }

    /**
     * 头部banner条
     * @returns {XML}
     * @private
     */
    _renderHeadBanner = () => {
        return (
            <View style={{marginBottom: 10}}>
                <BannerView
                    images={this.state.headBanner}
                    defaultImage={images.one_fill}
                    itemOnPress={(item) => {
                    }}
                />
            </View>
        )
    };
    /**
     * 分割线
     * @returns {XML}
     * @private
     */
    _separator = () => {
        return <View style={{height: 10, backgroundColor: '#eee'}}/>;
    };


    /**
     * 近期热门作者
     * @private
     */
    _renderAuthor() {
        return (
            <View style={{backgroundColor: "#fff", paddingHorizontal: 20, flexDirection: "column"}}>
                <Text style={{marginBottom: 20}}>近期热门作者</Text>
                {this._renderAuthorItem()}
                <Text style={{
                    fontSize: 14,
                    borderWidth: 0.5,
                    paddingHorizontal: 15,
                    textAlign: "center",
                    textAlignVertical: "center",
                    marginTop: 20,
                    alignSelf: "center",
                    marginBottom:10
                }} onPress={() => {
                    this._setAuthor()
                }}>换一换</Text>
            </View>

        )
    }

    /**
     * 返回单条的作者信息
     * @returns {Array}
     * @private
     */
    _renderAuthorItem() {
        let re = [];
        if (this.state.selectAuthor.length <= 0) return;
        for (let i = 0; i < this.state.selectAuthor.length; i++) {
            re.push(
                <View key={i} style={{flexDirection: "row", marginVertical: 10, alignItems: "center"}}>
                    <ImageButton
                        defaultSource={images.defaultImage}
                        source={{uri: this.state.selectAuthor[i].web_url}}
                        style={{height: 40, width: 40, borderRadius: 20}}
                    />
                    <View style={{flexGrow: 1, flexDirection: "column", width: 100, marginLeft: 10}}>
                        <Text>{this.state.selectAuthor[i].user_name}</Text>
                        <Text numberOfLines={1} ellipsizeMode="tail">{this.state.selectAuthor[i].desc}</Text>
                    </View>
                    <Text style={{
                        fontSize: 14,
                        borderWidth: 0.5,
                        paddingHorizontal: 15,
                        textAlign: "center",
                        textAlignVertical: "center"
                    }}>关注</Text>
                </View>)
        }
        return re
    }

    /**
     * 产生随机数
     * @param Min
     * @param Max
     * @returns {*}
     * @private
     */
    _randomNum(Min, Max) {
        var Range = Max - Min;
        var Rand = Math.random();
        var num = Min + Math.round(Rand * Range);
        return num;
    }

    /**
     * 判断是否包含某个元素
     * @param arr
     * @param obj
     * @returns {boolean}
     * @private
     */
    _contains(arr, obj) {
        var i = arr.length;
        while (i--) {
            if (arr[i] === obj) {
                return true;
            }
        }
        return false;
    }

    /**
     * 随机选出3个作者信息进行展示
     * @private
     */
    _setAuthor() {
        let rom = [];
        do {
            let num = this.state.author[this._randomNum(0, this.state.author.length - 1)];
            if (!this._contains(rom, num)) {
                rom.push(num);
            }
        } while (rom.length < 3);

        this.setState({
            selectAuthor: rom
        });
    }

    /**
     * 返回中间内容的item
     * @param item
     * @returns {XML}
     * @private
     */
    _renderListItem(item) {
        console.log("=======_renderListItem=====>"+item.key);
        if(item.key==5){
                return(
                    <View>
                        {this._renderAuthor()}
                        {this._separator()}
                        <Text style={{backgroundColor:"#fff",padding:10}}>所有人问所有人</Text>
                        <ScrollView
                            showsHorizontalScrollIndicator={false}
                            horizontal ={true}
                            style={{backgroundColor:"#fff"}}
                        >
                            {this._renderCenterBanner()}
                        </ScrollView>
                        {this._separator()}
                        <View key={item.key} style={{
                            flex: 1,
                            justifyContent: "center",
                            flexDirection: "column",
                            alignItems: "center",
                            backgroundColor: "#fff",
                            padding: 20
                        }}>
                            <ImageButton
                                defaultSource={images.defaultPic}
                                source={{uri: item.item.cover}}
                                style={{width: Dimensions.get("window").width - 40, height: 180}}
                                onPress={()=>{
                                    this.props.navigation.navigate("ImageViewer", {
                                        images: [{uri: item.item.cover}],
                                    })
                                }}
                            />
                            <Text style={{padding: 10, textAlign: "left", color: "#000"}}>{item.item.title}</Text>
                        </View>

                    </View>


                )
            }
            if(item.key==this.state.contentJson.length-1){
                return (
                    <View key={item.key} style={{
                        flex: 1,
                        justifyContent: "center",
                        flexDirection: "column",
                        alignItems: "center",
                        backgroundColor: "#fff",
                        padding: 20,
                        marginBottom:30
                    }}>
                        <ImageButton
                            defaultSource={images.defaultPic}
                            source={{uri: item.item.cover}}
                            style={{width: Dimensions.get("window").width - 40, height: 180}}
                        />
                        <Text style={{padding: 10, textAlign: "left", color: "#000"}}>{item.item.title}</Text>
                    </View>
                )
            }
        return (
            <View key={item.key} style={{
                flex: 1,
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "#fff",
                padding: 20
            }}>
                <ImageButton
                    defaultSource={images.defaultPic}
                    source={{uri: item.item.cover}}
                    style={{width: Dimensions.get("window").width - 40, height: 180}}
                />
                <Text style={{padding: 10, textAlign: "left", color: "#000"}}>{item.item.title}</Text>
            </View>
        )
    }

    /**
     * 是否还需要更新数据
     * @returns {boolean}
     * @private
     */
    _isRefreshing() {
        let result = true;
        if (!this.state.headBanner.length > 0) {
            this._fetchJson();
        } else if (!this.state.centerBanner.length > 0) {
            this._fetchCenterBanner();
        } else if (!this.state.author.length > 0) {
            this._fetchAuthor();
        } else if (!this.state.contentJson.length > 0) {
            this._fetchContent()
        } else {
            result = false;
        }
        return result;

    }

    /**
     * 加载json数据
     * @private
     */
    _fetchJson() {
        //加载头部banner
        fetch(constants.allHeadBanner)
            .then(response => response.json())
            .then(responseJson => {
                let beans = responseJson.data;
                let images = [];
                for (let i = 0; i < beans.length; i++) {
                    images.push(beans[i].cover);
                }
                this.setState({
                    headBanner: images,
                    isRefreshing: this._isRefreshing()
                })

            })
            .catch(error => {
            });
    }

    _fetchContent() {
        //加载中间内容
        fetch(constants.allContent)
            .then(response => response.json())
            .then(responseJson => {
                let beans = responseJson.data;
                let content = [];
                for (let i = 0; i < beans.length; i++) {
                    content.push({
                        key: i,
                        item: beans[i]
                    });
                }
                this.setState({
                    contentJson: content,
                    isRefreshing: this._isRefreshing()
                })

            })
            .catch(error => {
            });
    }

    _fetchAuthor() {
        //作者信息
        fetch(constants.allAuthor)
            .then(response => response.json())
            .then(responseJson => {
                this.setState({
                    author: responseJson.data,
                    isRefreshing: this._isRefreshing()
                });
                this._setAuthor();
            })
            .catch(error => {
            });
    }

    _fetchCenterBanner() {
        //中间banner
        fetch(constants.allCenterBanner)
            .then(response => response.json())
            .then(responseJson => {
                this.setState({
                    centerBanner: responseJson.data,
                    isRefreshing: this._isRefreshing()
                });
            })
            .catch(error => {
            });
    }

    fetchData() {
        this.setState({
            headBanner: [],
            contentJson: [],
            author: [],
            selectAuthor: [],
            centerBanner: [],
        });
        this._fetchContent();
        this._fetchJson();
        this._fetchCenterBanner();
        this._fetchAuthor();
    }

    componentDidMount() {
        this.fetchData();
    }
}