import React from 'react';
import { AppBar, Card, CardContent, Toolbar, Typography } from '@material-ui/core';

function WidgetLanguageCard() {
  return (
    <Card className="h-full rounded-16">
      <AppBar position="static" elevation={0}>
        <Toolbar className="pl-16 pr-8">
          <Typography variant="subtitle1" color="inherit" className="flex-1">
            語言設定
          </Typography>
        </Toolbar>
      </AppBar>
      <CardContent>
        <table className="simple clickable">
          <tbody>
            <tr>
              <td>語言</td>
              <td className="text-right">
                <Typography className="flex items-center font-semibold">
                  繁體中文
                </Typography>
              </td>
            </tr>
          </tbody>
        </table>
      </CardContent>
    </Card>
  )
}

export default WidgetLanguageCard;
