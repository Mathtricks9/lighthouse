/**
 * @license Copyright 2021 The Lighthouse Authors. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */

import {FunctionComponent} from 'preact';

import {NavigationIcon, SnapshotIcon, TimespanIcon} from './icons';
import {getScreenDimensions, getScreenshot} from './util';

export const Separator: FunctionComponent = () => {
  return <div className="Separator" role="separator"></div>;
};

export const FlowStepIcon: FunctionComponent<{mode: LH.Result.GatherMode}> = ({mode}) => {
  return <>
    {
      mode === 'navigation' && <NavigationIcon/>
    }
    {
      mode === 'timespan' && <TimespanIcon/>
    }
    {
      mode === 'snapshot' && <SnapshotIcon/>
    }
  </>;
};

export const FlowSegment: FunctionComponent<{mode?: LH.Result.GatherMode}> = ({mode}) => {
  return (
    <div className="FlowSegment">
      <div className="FlowSegment__top-line"/>
      {
        mode && <FlowStepIcon mode={mode}/>
      }
      <div className="FlowSegment__bottom-line"/>
    </div>
  );
};

export const FlowStepThumbnail: FunctionComponent<{
  reportResult: LH.ReportResult,
  width?: number,
  height?: number,
}> = ({reportResult, width, height}) => {
  const screenshot = getScreenshot(reportResult);

  // Resize the image to fit the viewport aspect ratio.
  const dimensions = getScreenDimensions(reportResult);
  if (width && height === undefined) {
    height = dimensions.height * width / dimensions.width;
  } else if (height && width === undefined) {
    width = dimensions.width * height / dimensions.height;
  }

  return <>
    {
      screenshot &&
        <img
          className="FlowStepThumbnail"
          src={screenshot}
          style={{width, height}}
          alt="Screenshot of a page tested by Lighthouse"
        />
    }
  </>;
};
