'use client'
require("core-js/actual/array/group-by");
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react'
import { DateRange } from 'react-date-range';
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { addDays, subDays, format, isAfter, isBefore, isEqual, parse } from 'date-fns';
import data from '@/lib/data'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
  
function Page() {
    const [Data, setData] = useState(data)
    const [feature, setFeature] = useState('A')
    const [range, setRange] = useState([
        {
            startDate: parse(data[0].Day, 'dd/MM/yyyy', new Date()),
            endDate: parse(data.at(-1).Day, 'dd/MM/yyyy', new Date()),
            key: 'selection'
        }
    ]);
    const optionLine = {
        chart: {
            id: 'apexchart-line'
        },
        xaxis: {
            categories: Object.keys(Data.groupBy(({ Day }) => Day))
        }
    }
    
    const optionBar = {
        chart: {
            id: 'apexchart-bar',
            events: {
                click: (event, chartContext, config) => {                   
                    if(config.dataPointIndex >= 0) setFeature(config.config.xaxis.categories[config.dataPointIndex])
                }
            },
        },
        plotOptions: {
            bar: {
                horizontal: true,
                columnWidth: '90%',
                barHeight: '90%',
            }
        },
        xaxis: {
            categories: ['A', 'B', 'C', 'D', 'E', 'F']
        }
    }

    let A = 0, B = 0, C = 0, D = 0, E = 0, F = 0;
    Data.map((dt) => {
        A+=dt.A
        B+=dt.B
        C+=dt.C
        D+=dt.D
        E+=dt.E
        F+=dt.F
    })
    
    const series = [{
        name: 'Total',
        data: [A, B, C, D, E, F]
    }]

    const [seriesLine, setSeriesLine] = useState([])

    useEffect(() => {
        let totalByDate: number[] = []
        Object.entries(Data.groupBy(({ Day }) => Day)).map((dt: any[]) => {
            let sum = 0
            
            dt[1].map((f:any) => sum+=f[feature])
            totalByDate.push(sum)
        })

        setSeriesLine([{
            name: 'Total',
            data: totalByDate
        }])

        const dateFilter = () => {
            setData(data.filter(dt => {
                return isBefore(subDays(parse(dt.Day, 'dd/MM/yyyy', new Date()), 1), range[0].endDate) && isAfter(addDays(parse(dt.Day, 'dd/MM/yyyy', new Date()), 1), range[0].startDate);
            }))
        }
    
        dateFilter()
    }, [feature, range])
    
    

    return (
        <>
            <div className="flex gap-6 mb-6 flex-col sm:flex-row">

                <Card className='w-full'>
                    <CardHeader>
                        <CardTitle>Total of {feature}</CardTitle>
                        <CardDescription>{format(range[0]?.startDate, 'dd/MM/yyyy')} - {format(range[0]?.endDate, 'dd/MM/yyyy')}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ApexChart type="line" options={optionLine} series={seriesLine} height={350} width={"100%"} />
                    </CardContent>
                    {/* <CardFooter>
                    </CardFooter> */}
                </Card>
                
                <Card className='w-auto'>
                    <CardHeader>
                        <CardTitle>Choose your date range</CardTitle>
                        <CardDescription>Changes will be reflected over the charts</CardDescription>
                    </CardHeader>
                    <CardContent className='flex justify-center'>
                    <DateRange
                        editableDateInputs={true}
                        onChange={(item:any) => setRange([item.selection])}
                        moveRangeOnFirstSelection={false}
                        ranges={range}
                    />
                    </CardContent>
                    {/* <CardFooter>
                    </CardFooter> */}
                </Card>
            </div>
            <Card className='mb-8'>
                <CardHeader>
                    <CardTitle>All features in total</CardTitle>
                    <CardDescription>{format(range[0]?.startDate, 'dd/MM/yyyy')} - {format(range[0]?.endDate, 'dd/MM/yyyy')}</CardDescription>
                </CardHeader>
                <CardContent>
                    <ApexChart type="bar" options={optionBar} series={series} height={350} width={"100%"} />
                </CardContent>
                {/* <CardFooter>
                </CardFooter> */}
            </Card>
        </>
        )
    }
    
    export default Page