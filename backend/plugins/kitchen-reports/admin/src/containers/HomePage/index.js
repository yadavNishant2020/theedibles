/*
 *
 * HomePage
 *
 */
import React, {memo, useState, useEffect} from "react";
import {LoadingIndicator, PluginHeader, request, useGlobalContext} from "strapi-helper-plugin";
import {useHistory} from "react-router-dom";
import {Button} from "@buffetjs/core";
import {Inputs} from '@buffetjs/custom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faDownload} from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

import pluginId from '../../pluginId';
import Row from "strapi-plugin-email-designer/admin/src/components/Row";
import getTrad from "../../utils/getTrad";

const HomePage = () => {

  const {formatMessage, plugins} = useGlobalContext();

  const defaultDorm = {


    "date_from": {
      styleName: 'col-6',
      label: 'Order Date From',
      description: '',
      type: 'date',
      value: moment(new Date()),
      validations: {
        required: true,
      },
    },
    "date_to": {
      styleName: 'col-6',
      label: 'Order Date To',
      description: '',
      value: moment(new Date()),
      type: 'date',
      validations: {
        required: true,
        date: true,
      },
    },
    "plan_type": {
      styleName: 'col-6',
      description: '',
      label: 'DIET PLAN',
      type: 'select',
      options: ['ALL'],
      value: 'ALL',
    },

  };
  const [form, setForm] = useState(defaultDorm);
  const [state, setState] = useState({date_to: moment(new Date()), date_from: moment(new Date())});
  const [downloader, setDownloader] = useState(false);
  const [pathToDownload, setPathToDownload] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = ({target: {name, value}}) => {
    setState(prevState => ({...prevState, [name]: value}));
    setDownloader(false)
  };


  useEffect(() => {

    (async () => {
     const options =  await loadDietPlan();
      let form = Object.assign({}, defaultDorm)
      form["plan_type"]["options"] = options
      setForm(form)
    })()

  }, []);


  const loadDietPlan = async () => {
    setIsLoading(true);
    try {
      const data = await request('/content-manager/collection-types/application::diets.diets?page=1&pageSize=10000&_sort=name:ASC', {
        method: 'GET'
      })
      let op = ["ALL"]
      if (data.results.length) {
        data.results.forEach((d, i) => {
          op.push(d.code)
        })
      }
      setIsLoading(false)

      return op;
    } catch (e) {
      console.log("dietplan", err)
      setIsLoading(false)

    }

  };

  const generate = () => {
    setIsLoading(true);
    request('/kitchen-reports/generate', {
      method: 'POST',
      body: state
    })
      .then(data => {
        console.log(data, data.path)

        if (data.path) {
          setDownloader(true);

         // if (data.path.search('public/') >= 0) {
            setPathToDownload(data.path)
          // } else {
          //   setPathToDownload("public/" + data.path)
          // }

        }
      })
      .catch((err) => {
          if (err.response.status === 422) {
            let resp = err.response.payload,
              errors = resp.errors,
              errorTxtArray = [];

            (Object.keys(errors)).forEach((val, kk) => {

              errorTxtArray.push(errors[val][0])

            });

            strapi.notification.error(errorTxtArray.join(' | '))

          } else {
            strapi.notification.error(
              formatMessage({id: getTrad('Report.generation.error')})
            )
          }
        }
      )
      .finally(() => setIsLoading(false));
  };

  const download = (path) => {

    window.open(
      '/' + path,
      '_blank'
    );
  };

  let button;

  if (downloader) {

    button = <Button color="success" icon={<FontAwesomeIcon icon={faDownload}/>} className="mr-2"
                     onClick={() => download(pathToDownload)}>Download</Button>

  } else {
    button = <Button isLoading={isLoading} onClick={generate}><span>Generate XLSX</span></Button>

  }

  return (
    <div className="container-fluid" style={{padding: "18px 30px"}}>

      <Row className="row">
        <div className="col-sm-6">
          <PluginHeader title="Kitchen Report" description="Generate daily report"/>
        </div>
        <div className="col-sm-6 text-right">
          {button}
        </div>
      </Row>
      {!plugins[pluginId].isReady && <LoadingIndicator/>}


      <section style={{marginTop: 3}}>
        <h2 style={{marginBottom: 36}}>Generate</h2>
        <form onSubmit={() => {
        }}>
          <div className="row">


            {Object.keys(form).map(input => (
              <div className={form[input].styleName} key={input}>
                <Inputs
                  name={input}
                  {...form[input]}
                  onChange={handleChange}
                  translatedErrors={{
                    date: 'This is not a date',
                    email: 'This is not an email',
                    string: 'This is not a string',
                    number: 'This is not a number',
                    json: 'This is not a JSON',
                    max: 'This is too high',
                    maxLength: 'This is too long',
                    min: 'This is too small',
                    minLength: 'This is too short',
                    required: 'This value is required',
                    regex: 'This does not match the format',
                    uppercase: 'This must be a upper case string',
                  }}
                  value={state[input] || form[input].value}
                />
              </div>
            ))}
          </div>
        </form>
      </section>
    </div>
  );
};

export default memo(HomePage);
