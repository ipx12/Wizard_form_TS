import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { useForm, Controller } from 'react-hook-form';
import Select, { MultiValue } from 'react-select';

import './capabilities.scss';

interface IOptions {
    value: string;
    label: string
}

interface ICapabilitiesFrom {
    skills: IOptions[] | [];
    aditional: string;
    art: boolean | string;
    gitar: boolean | string;
    nothing: boolean | string;
    play: boolean | string;
    sport: boolean | string;
    wtf: boolean | string;
}

const options: IOptions[] = [
    { value: 'HTML', label: 'HTML' },
    { value: 'CSS', label: 'CSS' },
    { value: 'Javascript', label: 'Javascript' },
    { value: 'React', label: 'React' },
    { value: 'Angular', label: 'Angular' },
    { value: 'jQuery', label: 'jQuery' },
    { value: 'NodeJS', label: 'NodeJS' },
    { value: 'Python', label: 'Python' },
    { value: 'PHP', label: 'PHP' },
    { value: 'Ruby On Rails', label: 'Ruby On Rails' },
    { value: 'SQL', label: 'SQL' },
    { value: 'BackboneJS', label: 'BackboneJS' },
    { value: 'Web Design', label: 'Web Design' },
    { value: 'Project management', label: 'Project management' },
    { value: 'Git', label: 'Git' },
    { value: 'Docker', label: 'Docker' },
    { value: 'AWS Lambda', label: 'AWS Lambda' },
    { value: 'Firebase', label: 'Firebase' },
]

const schema = yup.object({
    skills: yup.array()
                .min(3, 'Minimum 3 skills'),
    aditional: yup.string()
        .max(300, 'Max 300 simbols')
})

const CapabilitiesFrom = () => {

    const {
        control, 
        handleSubmit,
        register,
        formState: {errors}
    } = useForm<ICapabilitiesFrom>({
        resolver: yupResolver(schema)
    })

    const onSubmit = (data: any) => {
        console.log(data);
    };

    return (
        <div className="container">
            <div className="capabilities">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="column">
                    <div className='label'>
                        <label>Skills</label>
                    </div>
                    <Controller
                        name="skills"
                        control={control}
                        defaultValue={[]}
                        render={({ field: { onChange, value } }) => (
                        <Select
                            className={errors.skills ? 'basic-multi-select red-border' : 'basic-multi-select'}
                            classNamePrefix={errors.skills ? 'select red-border' : 'select'}
                            options={options}
                            value={value}
                            isMulti
                            onChange={(selectedOptions) =>
                                onChange(selectedOptions)
                            }
                        />
                        )}
                    />
                    {errors.skills ? <div className='error'>{errors.skills.message} </div>: null}
                    <div className='label label-mt'>
                        <label  htmlFor="area">Additional information</label>
                    </div>
                    <textarea
                        id='area'
                        {...register('aditional')}
                        placeholder='Guitar, guitar and guitar again. I’m fall in love with it.'
                    >
                    </textarea>
                </div>
                <div className="column">
                    <div className='label'>My hobbies</div>
                    <div role="group" aria-labelledby="checkbox-group">
                        <div className="checkbox">
                            <input type="checkbox" value="Art" id="art" {...register("art")} />
                            <label className='label' htmlFor="art">Art</label>
                        </div>
                        <div className="checkbox">
                            <input type="checkbox" value="Sport, fitness, aerobica and staff like that" id="sport" {...register("sport")}  />
                            <label className='label' htmlFor="sport">Sport, fitness, aerobica and staff like that</label>
                        </div>
                        <div className="checkbox">
                            <input type="checkbox" value="I just want to play games, I’m not living in this life" id="games" {...register("play")}  />
                            <label className='label' htmlFor="games">I just want to play games, I’m not living in this life</label>
                        </div>
                        <div className="checkbox">
                            <input type="checkbox" value="I’m a female... I’m doing nothing. Every day." id="nothing" {...register("nothing")}  />
                            <label className='label' htmlFor="nothing">I’m a female... I’m doing nothing. Every day.</label>
                        </div>
                        <div className="checkbox">
                            <input type="checkbox" value="Guitar, guitar and guitar again. I’m fall in love with it." id="guitar" {...register("gitar")}  />
                            <label className='label' htmlFor="guitar">Guitar, guitar and guitar again. I’m fall in love with it.</label>
                        </div>
                        <div className="checkbox">
                            <input type="checkbox" value="WTF is “hobbies”???" id="wtf" {...register("wtf")}  />
                            <label className='label' htmlFor="wtf">WTF is “hobbies”???</label>
                        </div>
                    </div>
                    <button 
                        type='button'
                        className='btn-back'>
                        Back
                    </button>
                    <button className='btn btn-finish' 
                            type="submit"
                            style={{background: '#5E97F3'}}
                            >Forward</button>
                </div>
            </form>
            </div>
        </div>
    )
}

export default CapabilitiesFrom;