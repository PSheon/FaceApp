import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    filter: 'blur(1px)',
    transition: 'filter .5s',
    '&:hover': {
      filter: 'blur(0px)',
    }
  },
  avatar: {
    backgroundColor: '#303030',
  },
}));

function WidgetNews(props) {
  const classes = useStyles();
  const { article } = props;

  return (
    <Card className="w-full rounded-12">
      <CardHeader
        avatar={
          <Avatar aria-label="Recipe" className={classes.avatar} src={article.source_info.img} />
        }
        title={article.source_info.name}
        subheader={moment.unix(article.published_on).format('YYYY-MM-DD hh:mm')}
      />
      <a href={article.url} target="_blank" rel="noopener noreferrer">
        <CardMedia
          className={classes.media}
          image={article.imageurl}
          title="Paella dish"
        />
      </a>
      <CardContent>
        <div className="flex items-center justify-start">
          {
            article.categories.split('|').slice(0, 4).map((category, i) =>
              <div className="rounded-full px-8 mr-8 font-600" key={i} style={{ backgroundColor: '#20bebe' }}>{category}</div>
            )
          }
        </div>
        <Typography gutterBottom variant="h6" component="h2">
          {article.title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {article.body.length > 100 ? (
            article.body.substr(0, 100) + '...'
          ) : (
              article.body
            )}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default React.memo(WidgetNews);
