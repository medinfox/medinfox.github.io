import Markdown from "react-markdown";

import Header from "../header";

export default function BattlePage() {
  const model1 = {
    患者姓名: ["崔某"],
    患者性别: ["女"],
    患者年龄: ["35"],
    首诊时间: [],
    首诊症状: [
      "口渴",
      "睡眠不佳",
      "咳嗽",
      "下肢浮肿",
      "小便不利",
      "舌色红绛",
      "苔薄黄",
    ],
    证候: ["厥阴下利"],
    中医诊断: ["猪苓汤证"],
    西医诊断: [],
    治法: [],
    方剂名称: ["猪苓汤"],
    中药名: ["茯苓", "泽泻", "滑石", "阿胶"],
    用药方式: ["口服"],
    剂型: ["汤剂"],
    用药方案: ["服五剂"],
  };
  const model2 = {
    患者姓名: ["崔某"],
    患者性别: ["女"],
    患者年龄: ["35"],
    首诊时间: [],
    首诊症状: [
      "腹泻",
      "口渴",
      "睡眠不佳",
      "咳嗽",
      "下肢浮肿",
      "小便不利",
      "脉沉而略滑",
      "舌色红绛",
      "苔薄黄",
    ],
    证候: ["厥阴下利"],
    中医诊断: ["猪苓汤证"],
    西医诊断: [],
    治法: [],
    方剂名称: ["猪苓汤"],
    中药名: ["猪苓", "泽泻", "滑石", "阿胶"],
    用药方式: ["口服"],
    剂型: ["汤剂"],
    用药方案: ["服五剂"],
  };

  const truth = {
    患者姓名: ["崔某"],
    患者性别: ["女"],
    患者年龄: ["35"],
    首诊时间: [],
    首诊症状: [
      "腹泻",
      "口渴",
      "睡眠不佳",
      "咳嗽",
      "小便不利",
      "脉沉而略滑",
      "舌色红绛",
      "苔薄黄",
    ],
    证候: ["厥阴下利"],
    中医诊断: ["猪苓汤证"],
    西医诊断: [],
    治法: [],
    方剂名称: ["猪苓汤"],
    中药名: ["猪苓", "茯苓", "滑石", "阿胶"],
    用药方式: ["口服"],
    剂型: ["汤剂"],
    用药方案: ["服五剂"],
  };

  return (
    <>
      <Header title="Deepseek R1 vs Qwen2.5 32B" />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-2">
          <Result name="Deepseek R1" record={model1} truth={truth} />
          <Result name="Qwen2.5 32B" record={model2} truth={truth} />
        </div>
        <div className="bg-muted/50 min-h-[100vh] p-4 text-xl flex-1 rounded-xl md:min-h-min">
          崔某，女，35岁。因产后患腹泻，误以为虚，屡进温补，并无实效。切其脉沉而略滑，视其舌色红绛，而苔薄黄。初诊以其下利而又口渴，作厥阴下利治之，投白头翁汤不甚效。一日又来诊治，自述睡眠不佳，咳嗽，小便不利，大便每日三四次，口渴欲饮水。倾听之后，思之良久，乃恍然而悟，此乃猪苓汤证。《伤寒论》第319条说：“少阴病，下利六七日，咳而呕渴，心烦不得眠者，猪苓汤主之。”今呕咳下利主证已见，治当无疑。遂处方：猪苓10克，
          茯苓10克， 泽泻10克， 滑石10克，
          阿胶10克。此方服五剂，而小便利，腹泻止，诸证悉蠲。
        </div>
      </div>
    </>
  );
}

type ResultProps = {
  name: string;
  record: Record<string, string[]>;
  truth: Record<string, string[]>;
};
const Result = ({ name, record, truth }: ResultProps) => {
  const keys = Object.keys(truth);
  const partKeys = ["患者姓名", "患者性别", "患者年龄"];

  return (
    <div className="flex flex-col gap-2">
      <div className="bg-muted/50 aspect-video rounded-xl p-4">
        <div>
          <div className="grid gap-2 md:grid-cols-3">
            {partKeys.map((key) => (
              <Entry
                key={key}
                id={key}
                predict={record[key]}
                truth={truth[key]}
              />
            ))}
          </div>
          {keys
            .filter((k) => !partKeys.includes(k))
            .map((key) => (
              <Entry
                key={key}
                id={key}
                predict={record[key]}
                truth={truth[key]}
              />
            ))}
        </div>
      </div>
      <div className="mx-auto font-bold">{name}</div>
      <div className="min-h-40 max-h-80 rounded-xl p-4 text-sm bg-muted/50 text-muted-foreground overflow-y-auto">
        <Markdown>{`\`\`\`json\n${JSON.stringify(
          record,
          null,
          4
        )}\n\`\`\``}</Markdown>
      </div>
    </div>
  );
};

type EntryProps = {
  id: string;
  predict: string[];
  truth: string[];
  labelWidth?: string;
};

const Entry = ({ id, labelWidth, predict, truth }: EntryProps) => {
  const wrong = predict?.filter((t) => !truth?.includes(t));

  return (
    <div className="min-h-12 bg-accent flex flex-row my-1 gap-4 items-center">
      <div className={`${labelWidth ?? "w-20"} font-bold text-right`}>{id}</div>
      <div className="flex flex-row flex-wrap gap-2 leading-4">
        {truth?.map((item) =>
          predict?.includes(item) ? (
            <span key={item} className="text-green-500">
              {item}
            </span>
          ) : (
            <span key={item} className="text-gray-500">
              {item}
            </span>
          )
        )}
        {wrong?.map((item) => (
          <span key={item} className="text-red-500 line-through">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};
