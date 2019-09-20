import React from 'react';
import {Button, Card, Divider, Icon, IconButton, Typography} from '@material-ui/core';

const data = {
		rows: [
			{
				title: 'Holiday Travel',
				clicks: 3621,
				conversion: 90
			},
			{
				title: 'Get Away Deals',
				clicks: 703,
				conversion: 7
			},
			{
				title: 'Airfare',
				clicks: 532,
				conversion: 0
			},
			{
				title: 'Vacation',
				clicks: 201,
				conversion: 8
			},
			{
				title: 'Hotels',
				clicks: 94,
				conversion: 4
			}
		]
	}

function WidgetUserRanking(props)
{
    return (
        <Card className="w-full rounded-8 shadow-none border-1">

            <div className="p-16 pr-4 flex flex-row items-center justify-between">

                <Typography className="h1 pr-16">Top campaigns</Typography>

                <div>
                    <IconButton aria-label="more">
                        <Icon>more_vert</Icon>
                    </IconButton>
                </div>
            </div>

            <table className="simple clickable">
                <thead>
                    <tr>
                        <th></th>
                        <th className="text-right">Clicks</th>
                        <th className="text-right">Conv</th>
                    </tr>
                </thead>
                <tbody>
                    {data.rows.map(row => (
                        <tr key={row.title}>
                            <td>{row.title}</td>
                            <td className="text-right">{row.clicks}</td>
                            <td className="text-right">{row.conversion}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Divider className="card-divider w-full"/>

            <div className="p-8 pt-16 flex flex-row items-center">
                <Button>GO TO CAMPAIGNS</Button>
            </div>
        </Card>
    );
}

export default React.memo(WidgetUserRanking);
