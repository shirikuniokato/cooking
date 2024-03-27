import Image from "next/image";
import Link from "next/link";
export default function Footer() {
  return (
    <footer>
      <div className="footer_inner c-anim-up move">
        <dl className="delay1">
          <dt>西岡 公式SNS</dt>
          <dd>
            <ul>
              <li>
                <a href="https://twitter.com/mei_nagano0924" target="_blank">
                  <img src="/icon_x.svg" alt="永野芽郁 公式X" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/mei_nagano0924official/"
                  target="_blank"
                >
                  <img src="/icon_insta.svg" alt="永野芽郁 公式Instagram" />
                </a>
              </li>
            </ul>
          </dd>
        </dl>
        <dl className="delay1">
          <dt>西岡の花婿修行 公式SNS</dt>
          <dd>
            <ul>
              <li>
                <a
                  href="https://x.com/meinagano_event?s=11&amp;t=B2fmsJcHmteC1JlzlaVvsg"
                  target="_blank"
                >
                  <img src="/icon_x.svg" alt="非公開 公式X" />
                </a>
              </li>
            </ul>
          </dd>
        </dl>
        <div className="">
          <p className="txt_corp">
            西岡結婚プロジェクト<span>企画・制作：西岡</span>
          </p>
          <p className="txt_copy">© 西岡組.</p>
        </div>
        <figure className="obj04">
          <img src="/obj_08.svg" alt="こんな永野芽郁、見たことない。" />
        </figure>
        <figure className="obj05">
          <img src="/obj_03.svg" alt="こんな永野芽郁、見たことない。" />
        </figure>
      </div>
    </footer>
  );
}
