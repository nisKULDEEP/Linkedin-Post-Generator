import React, { useState, useEffect, useMemo } from 'react';
import { LikeIcon } from './icons/LikeIcon';
import { CommentIcon } from './icons/CommentIcon';
import { RepostIcon } from './icons/RepostIcon';
import { SendIcon } from './icons/SendIcon';
import { LikeFilledIcon } from './icons/LikeFilledIcon';
import { LoveIcon } from './icons/LoveIcon';

interface PostPreviewProps {
  editedText: string;
  imageUrl: string;
}

const PREVIEW_LINE_LIMIT = 4;
const PROFILE_PIC_BASE64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARwAAAEcCAMAAADk846+AAAAaVBMVEX////r6+v8/Pz9/f36+vr09PTt7e319fXz8/P5+fn4+Pjw8PDu7u7y8vL+/v7k5OTe3t7n5+fl5eXc3NzMzMy/v7+rq6uhoaGbm5uWlpaioqKysrKenp6BgYGOjo6pqam7u7uQkJBot8oSAAAIHElEQVR4nO2d63qiOhCGU9mJijfGoud5/1d5RRAQAoUg7Yx3d/v9XhAEhGfSSrZt27Zt27Zt27Zt27Zt27Zt27Zt2w7G/z5+fX199+49mXm43G5X8mQy6e/u3s05mZ1+7q3d/f7o4YtP397/e8l0lJ/vfv70zI/H+/vP79+/feYvT/7l50eX//35y83Pnx+/ffmJg28tfn25/Gkz/PPD/b+M/Hjz4cOD/339+vvv778c/Hj25fN/P/yXwz89u/w1T09//vrz6e/391d+fuV/f/wvh3/88On+f399/fX49eXvT5/+/fP78z+f/v74+pPZf27+ZPbX588e//r77x8P/vr8y2d/u/rXv37+/JPPz88/P//2+P3vT39//Pz9//74p5fPnz+ff/x09c/9/Q//y9+u/uX4r79+P/jz+eOTn5/+/PDvTw9ffvr0r39++Pefw1/+/Pr6809++uV/+vrX3/7108v/e365/B/9/fT0X/f3+09/+fPj8eOXTz/vP/f3z78+ffr8+PjFp2d/++mnh2eXn/7+/OfH48c3nx5+fnb50+Przz+/P//8y8+PP/168/Onq395fPzrz4/ff/r08vnjF7/89OnPnz7d/fr6+/3x8w+/PPnz8enPH18//+nT5c8//fr8p+Pnn/798efPX/z85Wf+fuV/+PjN7/8//fnq35/vPz/8v/90+fP5+5e//vTw8vOrv/z07PDj8R//8vT3+/M//frnz59ffn3+9N9ff/l5+eePz759+P/5l6fP3/65P5n+6sO3n65/fH5y+eM3nz7/+vrL80+/+/unp39/+Pfj049Pz759+P/T8+fPj19++uXXn/7z9OPrX56ef/rw/P3rT6f//vr971/+e/n89+cf/p+P/+vF/775/O8f33/59OH/fv10+fvvT/88/Pn4/dffnx7/5uT/fv3180+P3/z+l1/+/Onz1z8f//bp8j+ff/nx+OH5l+v/fnn44cOn//vy79/PP776+cffH7//9Prvv//8y9Nf/3z96eNf//nrz7//+e+fnv/86en/5+fPT3/+9PTfP/39+vPj/+fnz//26fPj+x+//fTw9OOnq7/++dPD8fM3P37+8h9f33z+/u3x+O/vvz//v/9+eP3rX/f3/f3px1//fHP58fvvjx//9OTrT1//fvz8/Orf//z48eunH/f3T5f/+e+fnr/98vj5518e//r680/X/7r+6/3nL3/+9P/0/Pnx/PnjL//89vjnr5/Pnz++fv/x0+fHT09v/+X5w39vj8efHr749P/x8enPHx+/ffrw7+9fvnv449Nff/r5p//l9J/PX/z24/1vV/98enjxyeGv/4O/P/+y/OnjH1//ffj+/vTx+vj9w9c3/vrh4fGvb/f/9N/Pv/778eXnH776518+f/j39y+/fv744eMbX/709+d//vTnR5e//vTr6+9P3/z6519//fH88Pz86fLvX75/8P2/Pv/1+v/t8c/j9/df/31+/uHX118+/OH+fnn611++/fD9L//9+e/zL3/+l+c//eXx8e9Pz3/+9c3Pb37+49/fH/z+l6fvD7//9PHLp//98Pvvj8effn/78O+/j/7/+OEPj3/+8PPD/+P+86+f//z4y6cvj+/ef7/ePHt+8vj17w9/fuVn//798Pvv8w//ffn88P3/eP/r+w/f/fjh++9f3h//f/l0+efh/75/+eX5z1++fv7y+x+/3j77++H5r39/fPb3z/Mvv7/e/uP3H5//+vnPL3/+/Pjl05//PP3+4cMPjx//ff/h+4efH/7w9e+///j+y+d/fvh+/ffTpz/85ff//o/Hjx9+eH58f/nz//P//PDw/PPD+18+f3j+x+PzL3/+eHz+/u+ffv/+8/jL49//ffj653G/3u12411+32/2o91+d/O5xX862XW4Xy/XG+R/tFvP3X252S0Xp2uP/3S6a/fF8Rj+aHfp2a0W+3X/G049x/p430/2y/f07hP+0fN+6rnHcM3/dM/n930/l6+W/1HPlz+v/3R1z3N/3s/d47f0H/2T/4j7j/p472fO4/083fV//Wf+4uE1/9Pj1/c3/3G/nve/eX+9/uM7ev8vL8t/uB+PvL9G73+W/8f+e8X4P/pnu8PzP77+w+/16zX/w90+/qD1X8fL3uP3evkH/z0/l3/wnl/uGv/hfrq/P/j+HvD9b8j4f4b1H/zX/x7rP7j/3mX+/V3c/3F/vFz/wX18/v7g+0fL/wD2//n7/+H/cPWf/5evf5f/Cfn/Y/7/+fvfUfyfzD/y//xX5P+A/M3fH37//xP8v3//K/Lf4v63//31Cvk/5e9v/j8/e/Lf//8T/H/+9+sL9T/H//7Ld/v616/5//1/f3n++zP9L8H/c/G/e/1b2P/+ff7P4v8l/L/E/e+/JflvL/4f5f9W93+D/f9A//1fIP/v+j/h/7f7P27//r9K/z8c/3/A/v3fIP/fFf+fE/8P9n/U///c/33r7/+3+L/T/Q9X/0v838b9H97/ufr/Y/y//vXh/7fofx/9f3j9b8r/Tf7/+n+K/6/k/wX+/8fxfzX+/8D+v2T/3yX+b8f+7yT/Bf+/1P+1/f9b+78L/H+x/6v8n7z/d/H/e/V/H/h/e/+vwH/X+P/b9f/r/V/a/1D/p8H/T+r/9fp/e/1/4/w/T/T/Wfl/fP/f2P83/78h/J/a/8/X/8v/J/H/H+D/9f+v6P/2/X+Z/5/+38r/S/q/3P8Z/Z82/a/V//X/r/L/bvg/v/974//b+P/e/T+n/5fy/zX6/5n8P2P/1/b/Dvv/gv5fh//n+v81/r9m/x/1/z38v1H/X+L/j/Z/e//vw//T+b9a/6/5/4X8v3n+b7r/X8z/0/N/Xfz/5vp/gP5n7v/X+f/V/L8B/5//P1P/z9P/J+b/iPyf1/+H//9V/c/R/wv93yn/N/G/wP+/W/+n/H/+v4j+f4z+Pyn+P33/f4H/T87/1fT/BfK/Uf+P+v8l+f9O/x/a/x8U//f4f4r+n5L//8H/W/1/sP+H+78R/F+1/zf9P+P/L/t/X/1/2/p/mP5v6/8t+P/S/i/r/5P+f4D+n4r/K/v/Uvp/Bvq/rf+b5v/Z+H9a/jfq/2nxv73/t+n//wD5P2/+D/F/Kfwftf+v+//N93/v/V/7/zP9Pyn+//j/d/H/Efu/7/x/F/937f/D/N9o/p+a//cR/I/M/2/2f/v/b/j/gv3/U//P+H/9/w/4fwr+H/H/c/p/hP7f8v/n5P9e/J/s/6fr/2P8Pwv/39L/tfr/F/v/Vfn/tP1v4/8X9H83/m/w/+X/r/L/Cft/F/n/L/R/T/9f8f9y/j/p/wH5f/b+r9z/vfj/V/X/Uvxfz//j/b8L/u+1/w8E/w/ifzP+P+H/Hfxft/9f+D+u/xP8n6//J+z/Cfu/+v9t+H/G//cQ/d/I/5H9/+H+n/3/9u9s27Zt27Zt27Zt27Zt27Zt27Zt27ad4H/0Jv6X65r6pQAAAABJRU5ErkJggg==";

const PostPreview: React.FC<PostPreviewProps> = ({ editedText, imageUrl }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [engagement, setEngagement] = useState({ likes: 0, comments: 0, reposts: 0 });

  useEffect(() => {
    setEngagement({
      likes: Math.floor(Math.random() * 200) + 20,
      comments: Math.floor(Math.random() * 50) + 5,
      reposts: Math.floor(Math.random() * 20) + 1,
    });
  }, []);

  const textLines = useMemo(() => editedText.split('\n'), [editedText]);
  const isTruncated = textLines.length > PREVIEW_LINE_LIMIT;

  const displayText = useMemo(() => {
    const linesToRender = (isTruncated && !isExpanded) ? textLines.slice(0, PREVIEW_LINE_LIMIT) : textLines;
    return linesToRender.map((line, index) => (
      <p key={index} className="min-h-[1em] text-sm">
        {line}
      </p>
    ));
  }, [textLines, isTruncated, isExpanded]);

  return (
    <div>
      <h3 className="text-xl font-bold text-black mb-2">Post Preview</h3>
      <div className="bg-white p-3 rounded-lg border-2 border-black shadow-[4px_4px_0px_#000] w-full font-sans">
        <div className="flex items-center mb-2">
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden border-2 border-black">
             <img src={PROFILE_PIC_BASE64} alt="Kuldeep Singh" className="w-full h-full object-cover" />
          </div>
          <div className="ml-2">
            <div className="font-bold text-base text-gray-900" style={{fontFamily: 'Kalam, cursive'}}>Kuldeep Singh</div>
            <div className="text-xs text-gray-500">Growth | Helping you with AI</div>
          </div>
        </div>

        <div className="text-sm text-gray-800 whitespace-pre-wrap break-words">
          {displayText}
          {isTruncated && !isExpanded && (
            <button onClick={() => setIsExpanded(true)} className="text-xs text-gray-500 font-semibold hover:underline">
              ...more
            </button>
          )}
        </div>

        {imageUrl && (
          <div className="mt-2 border-2 border-black rounded-md overflow-hidden">
            <img src={imageUrl} alt="Post graphic" className="w-full h-auto object-cover" />
          </div>
        )}
        
        <div className="mt-1.5 text-xs text-gray-500 flex items-center justify-between">
            <div className="flex items-center">
                <LikeFilledIcon className="w-4 h-4" />
                <LoveIcon className="w-4 h-4 -ml-1" />
                <span className="ml-1.5">{engagement.likes}</span>
            </div>
            <div>
                <span>{engagement.comments} comments</span>
                <span className="ml-2">&bull;</span>
                <span className="ml-2">{engagement.reposts} reposts</span>
            </div>
        </div>

         <div className="mt-1 pt-1 border-t border-gray-200 flex items-center justify-around text-gray-600">
            <button className="flex items-center space-x-1 hover:bg-gray-100 rounded-md p-1.5 text-xs font-semibold">
              <LikeIcon className="w-4 h-4" />
              <span>Like</span>
            </button>
            <button className="flex items-center space-x-1 hover:bg-gray-100 rounded-md p-1.5 text-xs font-semibold">
              <CommentIcon className="w-4 h-4" />
              <span>Comment</span>
            </button>
            <button className="flex items-center space-x-1 hover:bg-gray-100 rounded-md p-1.5 text-xs font-semibold">
              <RepostIcon className="w-4 h-4" />
              <span>Repost</span>
            </button>
            <button className="flex items-center space-x-1 hover:bg-gray-100 rounded-md p-1.5 text-xs font-semibold">
              <SendIcon className="w-4 h-4" />
              <span>Send</span>
            </button>
        </div>
      </div>
    </div>
  );
};

export default PostPreview;
