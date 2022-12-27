import React from "react";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import newsBySource from './config/newsBySourceAPI';
import Axios from "axios";
import { Divider, Grid, Header, Item, Button } from "semantic-ui-react";
import moment from "moment/moment";

export default function SourceComponent(props) {
    let { id } = useParams();
    const [page,setPage] = useState(1);
    const [sourceData, setSourceData] = useState([]);
    const [maxPages, setMaxPages] = useState(1);
    const [isMultiplePages, setIsMultiplePages] = useState(false);

    useEffect(() => {
        console.log('id',id);
        Axios.get(newsBySource(id, page)).then(({data}) => {
            console.log("source data",data);
            setSourceData(data);
            // this.setState({
            //     sourceData:data, isMultiplePages: data.totalResults > data.articles?.length,
            //     maxPages: Math.ceil(data.totalResults / data.articles?.length),
            // })
        })
    },[]);

    const renderNews = () => {
        return sourceData?.articles?.map((single) => 
        <Item>
            <Item.Image size='small' fluid src={single.urlToImage || '/not-found.png'} />
            <Item.Content>
                <Item.Header as='a' href={single.url} target="_blank">{single.title}</Item.Header>
                {single.author ?
                <Item.Meta>Author: <b>{single.author}</b></Item.Meta>
                :
                null
                }
                <Item.Description>
                <p>{single.description}</p>
                </Item.Description>
                <Item.Extra>Published: {moment(single?.publishedAt).format("MMMM Do YYYY")}</Item.Extra>
             </Item.Content>
        </Item>
        )
    }

    const changePage = (newPage) => {
        setPage(newPage);

        Axios.get(newsBySource(id, newPage)).then(({data}) => {
            console.log("changePage",data);
            setSourceData(data);
            setIsMultiplePages(data.totalResults > data.articles?.length);
        })
    }

    return (
        <div>
            <Divider/>
            <Grid>
                <Grid.Row>
                    <Grid.Column>
                        {/* <Header as='h3'>Source: <b>{sourceData?.articles[0]?.source?.name || id}</b></Header> */}
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        
                    <Item.Group divided>
                        {renderNews()}
                    </Item.Group>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Grid centered>
                    <Grid.Row>
                        <Button content="Previous" disabled={page === 1 ? true:false} onClick={() => changePage(page-1)}/>
                        <Button content="Next" disabled={!isMultiplePages || page === maxPages} onClick={() => changePage(page+1)} />
                    </Grid.Row>
                </Grid>
        </div>
    )

}

