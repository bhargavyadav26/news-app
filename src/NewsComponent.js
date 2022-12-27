import React from 'react';
import Axios from 'axios';
import { Dropdown, Grid, Item, Button } from 'semantic-ui-react';
import NewsAPI from './config/newsAPI'
import { Link } from 'react-router-dom';

class NewsComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            countryOptions: [
                {key:1, value: 'ae', text: 'United Arab Emirates'},
                {key:2, value: 'ar', text: 'Argentina'},
                {key:3, value: 'at', text: 'Austria'},
                {key:5, value: 'au', text: 'Australia'},
                {key:6, value: 'be', text: 'Belgium'},
                {key:7, value: 'br', text: 'Brazil'},
                {key:8, value: 'ca', text: 'Canada'},
                {key:9, value: 'cn', text: 'China'},
                {key:10, value: 'co', text: 'Columbia'},
                {key:11, value: 'cu', text: 'Cuba'},
                {key:12, value: 'cz', text: 'Czech Republic'},
                {key:13, value: 'eg', text: 'Egypt'},
                {key:14, value: 'fr', text: 'France'},
                {key:15, value: 'de', text: 'Germany'},
                {key:16, value: 'gr', text: 'Greece'},
                {key:17, value: 'hk', text: 'Hong Kong'},
                {key:18, value: 'hu', text: 'Hungary'},
                {key:19, value: 'in', text: 'India'},
                {key:20, value: 'id', text: 'Indonesia'},
                {key:21, value: 'ie', text: 'Ireland'},
                {key:22, value: 'il', text: 'Israel'},
                {key:23, value: 'it', text: 'Italy'},
                {key:24, value: 'jp', text: 'Japan'},
                {key:25, value: 'my', text: 'Malaysia'},
                {key:26, value: 'mx', text: 'Mexico'},
                {key:27, value: 'pl', text: 'Poland'},
                {key:28, value: 'ru', text: 'Russia'},
                {key:29, value: 'ua', text: 'Ukraine'},
                {key:30, value: 'uk', text: 'United Kingdom'},
                {key:4, value: 'us', text: 'United States'},
            ],
            selectedCountry: 'us',
            newsData: [],
            page: 1,
            isMultiplePages: false,
            maxPages: 1,
        }
    }

    componentDidMount() {
        const {selectedCountry, page} = this.state;
        Axios.get(NewsAPI(selectedCountry, page)).then(({data}) => {
            console.log("data",data);
            this.setState({
                newsData:data, isMultiplePages: data.totalResults > data.articles?.length,
                maxPages: Math.ceil(data.totalResults / data.articles?.length),
            })
        })
    }

    onChangeCountry = (event,data) => {
        console.log(data);
        const {value, page} = data;
        this.setState({
            selectedCountry: value,
        })
        Axios.get(NewsAPI(value, page)).then(({data}) => {
            console.log("data",data);
            this.setState({
                newsData:data, isMultiplePages: data.totalResults > data.articles?.length,
                maxPages: Math.ceil(data.totalResults / data.articles?.length),
            })
        })

    }

    renderData = () => {
        const {newsData} = this.state;
        let list = [];
        newsData?.articles?.map((single) => {
            list.push(
                <Item>
                    <Item.Image size='small' fluid src={single.urlToImage || '/not-found.png'} />
                
                    <Item.Content>
                    <Item.Header as='a' href={single.url} target="_blank">{single.title}</Item.Header>
                    <Item.Meta>
                        {
                            single.source?.id
                            ?
                            <Link to={'/source/' + single.source?.id}>
                            <span>Source: <b>{single.source?.name}</b></span>
                    </Link>
                    :
                    <span>Source: <b>{single.source?.name}</b></span>

                        }
        </Item.Meta>
                    <Item.Description>
                    <p>{single.description}</p>
                    </Item.Description>
                        </Item.Content>
                    
                </Item>
            )
        })
        return list;
    }

    changePage = (newPage) => {
        const {selectedCountry} = this.state;
        this.setState({
            page:newPage,
        })
        Axios.get(NewsAPI(selectedCountry, newPage)).then(({data}) => {
            console.log("data",data);
            this.setState({
                newsData:data, isMultiplePages: data.totalResults > data.articles?.length
            })
        })
    }

    render() {
        const {countryOptions, selectedCountry, page, isMultiplePages, maxPages} = this.state;
        return(
            <div>
                <Grid>
                    <Grid.Row>
                        <Grid.Column>
                            <Dropdown placeholder='Select Country'
                                fluid
                                search
                                selection
                                value={selectedCountry}
                                onChange={this.onChangeCountry}
                                options={countryOptions} />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                    <Item.Group divided>
                    {this.renderData()}
                    </Item.Group>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Grid centered>
                    <Grid.Row>
                        <Button content="Previous" disabled={page === 1 ? true:false} onClick={() => this.changePage(page-1)}/>
                        <Button content="Next" disabled={!isMultiplePages || page === maxPages} onClick={() => this.changePage(page+1)} />
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}

export default NewsComponent;