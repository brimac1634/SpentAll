import React, { useEffect, useMemo, useState } from 'react';

const NumberEncounting = ({ starting, ending, before, after, duration, ...otherProps }) => {
	const [number, setnumber] = useState(0);

	const getIntervals = (increment, total, numberOfIntervals) => {
		const halfOfTheAnimation = total / 2;
		const halfofIntervals = numberOfIntervals / 2;
		const r = (1 - increment) / (1 - Math.pow(increment, halfofIntervals))
		const baseInterval = halfOfTheAnimation * r;
		let halfOfIntervals = [];
		for (var i = 0; i < halfofIntervals; i++) {
		halfOfIntervals.unshift(baseInterval * Math.pow(increment, i))
		}
		const intervals = [...halfOfIntervals, ...halfOfIntervals.reverse()]
		return intervals
	}

	const intervals = useMemo(()=>getIntervals(1.2, duration, ending), [duration, ending])

	useEffect(()=>{
		if (ending <= 0 || number === ending) return;
		const interval = setInterval(()=>setnumber(number + 1), intervals[number])
		return ()=>clearInterval(interval)
	}, [ending, number, setnumber, intervals])

	return <h1 { ...otherProps }>{before}{number}{after}</h1>
}
export default NumberEncounting;