import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Chip from '@material-ui/core/Chip'

const useStyles = makeStyles({
  root: {
    maxWidth: 345
  },
  media: {
    height: 140
  }
})

export const Pokecard = ({ name, avatar, types, height, weight, onCardClick }) => {
  const classes = useStyles()
  const onClick = () => onCardClick(name)
  return (
    <Card className={classes.root} onClick={onClick}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          title={name}
          image={avatar || 'https://assets.pokemon.com/static2/_ui/img/favicon.ico'}
        />
        {/* TODO: добавить описание */}
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography gutterBottom variant="h6" component="h6">
            {types.map(type => <Chip key={type} variant="outlined" color="primary" label={type}/>)}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {`height: ${height} weight: ${weight}`}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
