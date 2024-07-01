export default function Rating({
  rating,
  activeRating = 'w-3 h-3 fill-[#ffce3d] text-[#ffce3d]',
  nonactiveRating = 'w-3 h-3 fill-current text-gray-400'
}: {
  rating: number
  activeRating?: string
  nonactiveRating?: string
}) {
  const ratingFormat = Number(rating.toFixed(1))

  const handleWith = (index: number) => {
    if (index <= ratingFormat) {
      return '100%'
    } else if (rating < index && index - rating < 1) {
      const result = (rating - Math.floor(rating)).toFixed(1)
      return Number(result) * 100 + '%'
    } else {
      return '0%'
    }
  }

  return (
    <div className='flex'>
      {Array(5)
        .fill(0)
        .map((_, index) => (
          <div key={index} className='relative'>
            <div
              style={{ width: `${handleWith(index + 1)}` }}
              className={`absolute top-0 left-0 h-full overflow-hidden `}
            >
              <svg enableBackground='new 0 0 15 15' viewBox='0 0 15 15' x={0} y={0} className={activeRating}>
                <polygon
                  points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeMiterlimit={10}
                />
              </svg>
            </div>
            <svg enableBackground='new 0 0 15 15' viewBox='0 0 15 15' x={0} y={0} className={nonactiveRating}>
              <polygon
                points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeMiterlimit={10}
              />
            </svg>
          </div>
        ))}
    </div>
  )
}
