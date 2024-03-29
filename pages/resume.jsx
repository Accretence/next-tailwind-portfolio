import Socials from '../components/Socials'
import Data from '../data/data.json'
import Container from '../components/Container'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Page() {
    const { locale = Data['defaultLocale'] } = useRouter()
    const [experiences, setExperiences] = useState(Data.resume.experiences)

    useEffect(() => {
        setExperiences(Data.resume.experiences)
    }, [locale])

    return (
        <Container
            title={locale == 'fa' ? 'رزومه' : 'Resume'}
            canonical="https://accretence.com/en/resume"
            description="Resume of Amirhossein Mohammadi"
            image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmiro.medium.com%2Fmax%2F4840%2F1*_eltQNfCM1xfi3MXK2rMJg.png&f=1&nofb=1&ipt=22209d08cb442adb015524f81b5f61e580ca9afcfa58cc21b568b48cddf5d7e3&ipo=images"
        >
            <div className="mt-6 w-full border border-neutral-200 py-6 laptop:py-12 px-6 laptop:px-32 rounded-lg dark:border-neutral-700">
                <h1 className="text-3xl">{Data['name'][locale]}</h1>
                <Socials className="mt-8" locale={locale} />
                <div className="mt-12">
                    <h1 className="text-2xl">
                        {locale == 'fa' ? 'تحصیلات' : 'Education'}
                    </h1>
                    <h2 className="mt-2 dark:text-neutral-300 text-neutral-700">
                        {Data.resume.education.institution[locale]} -{' '}
                        {Data.resume.education.course[locale]} -{' '}
                        {Data.resume.education.years[locale]}
                    </h2>
                </div>
                <div className="mt-12">
                    <h1 className="text-2xl">
                        {locale == 'fa' ? 'تجربه های کاری' : 'Experience'}
                    </h1>
                </div>
                <Experiences experiences={experiences} locale={locale} />
            </div>
        </Container>
    )
}

function Experiences({ experiences, locale }) {
    return (
        <div className="mt-6">
            {experiences.map(
                ({
                    dates,
                    type,
                    position,
                    company,
                    companyURL,
                    description,
                }) => (
                    <div
                        key={Math.random()}
                        className="my-4 w-full h-full border border-neutral-200 rounded-lg dark:border-neutral-700"
                    >
                        <div className="p-5">
                            <p className="mb-1 font-normal text-sm text-gray-700 dark:text-gray-400">
                                {dates[locale]} - {type[locale]}
                            </p>
                            <h5 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={companyURL}
                                >
                                    {company[locale]}
                                </a>{' '}
                                - {position[locale]}
                            </h5>
                            {typeof description[locale] == 'string' ? (
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                    {description[locale]}
                                </p>
                            ) : (
                                <ul className="list-disc px-10">
                                    {Object.keys(description[locale]).map(
                                        (item) => {
                                            return (
                                                <li
                                                    key={Math.random()}
                                                    className="mt-4"
                                                >
                                                    <h2 className="mb-4 font-bold">
                                                        {item}
                                                    </h2>
                                                    <p className="text-gray-700 dark:text-gray-400">
                                                        {
                                                            description[locale][
                                                                item
                                                            ]
                                                        }
                                                    </p>
                                                </li>
                                            )
                                        }
                                    )}
                                </ul>
                            )}
                        </div>
                    </div>
                )
            )}
        </div>
    )
}
