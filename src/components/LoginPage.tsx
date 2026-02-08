import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import svgPaths from "../imports/svg-wzb3x508pq";
import imgLoginScreen from "figma:asset/f32fe4174e1388150f662137c9e22e662da20c29.png";

function Container() {
  return <div className="absolute bg-[rgba(152,16,250,0.2)] blur-[64px] left-[-80px] rounded-[26821100px] size-[319.995px] top-[-80px]" data-name="Container" />;
}

function Container1() {
  return <div className="absolute bg-[rgba(230,0,118,0.2)] blur-[64px] left-[98.87px] rounded-[26821100px] size-[383.991px] top-[437.23px]" data-name="Container" />;
}

function Container2() {
  return (
    <div className="absolute left-[134.29px] size-[287.996px] top-[586.47px]" data-name="Container">
      <div className="absolute inset-[-44.44%_-46.04%_-44.44%_-44.44%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 548.581 543.996">
          <g filter="url(#filter0_f_1_68)" id="Container">
            <path d={svgPaths.p2e3f4680} fill="var(--fill-0, #8200DB)" fillOpacity="0.2" />
            <path d={svgPaths.p3de7c400} id="Vector 1" stroke="var(--stroke-0, black)" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="543.996" id="filter0_f_1_68" width="548.581" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feGaussianBlur result="effect1_foregroundBlur_1_68" stdDeviation="64" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute h-[874.468px] left-[-0.4px] overflow-clip top-[-0.19px] w-[402.863px]" data-name="Container">
      <Container />
      <Container1 />
      <Container2 />
    </div>
  );
}

function LoginScreen() {
  return (
    <div className="absolute h-[127.993px] left-[78.67px] top-[32px] w-[213.509px]" data-name="LoginScreen">
      <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgLoginScreen} />
    </div>
  );
}

function Icon() {
  return (
    <div className="h-[23.992px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[62.5%_16.67%_12.5%_16.67%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-6.25%_0_-6.25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.9943 6.99779">
            <path d={svgPaths.p17cbf400} id="Vector" stroke="var(--stroke-0, #A93A8D)" strokeWidth="1.99937" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[12.5%_33.33%_54.17%_33.33%]" data-name="Vector">
        <div className="absolute inset-[-12.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.99684 9.99684">
            <path d={svgPaths.p6397e32} id="Vector" stroke="var(--stroke-0, #A93A8D)" strokeWidth="1.99937" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="h-[23.992px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[45.83%_12.5%_8.33%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-9.09%_-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.9937 12.9959">
            <path d={svgPaths.p26644580} id="Vector" stroke="var(--stroke-0, #A93A8D)" strokeWidth="1.99937" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[8.33%_29.17%_54.17%_29.17%]" data-name="Vector">
        <div className="absolute inset-[-11.11%_-10%_0_-10%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.9962 9.99684">
            <path d={svgPaths.pba2ff00} id="Vector" stroke="var(--stroke-0, #A93A8D)" strokeWidth="1.99937" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="absolute left-[199.61px] size-[15.999px] top-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9991 15.9991">
        <g id="Icon">
          <path d="M3.33315 7.99956H12.666" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33326" />
          <path d={svgPaths.p278cfa80} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33326" />
        </g>
      </svg>
    </div>
  );
}

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const success = await login(username, password);
      
      if (!success) {
        setError('Nom d\'utilisateur ou mot de passe incorrect');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Erreur de connexion. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative size-full" data-name="LOGIN" style={{ backgroundImage: "linear-gradient(rgb(139, 58, 141) 0%, rgb(169, 58, 141) 50%, rgb(201, 58, 141) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }}>
      <Container3 />
      
      <div className="absolute h-[592.679px] left-[16px] top-[140.89px] w-[370.865px]">
        <div className="absolute bg-[rgba(255,255,255,0.95)] h-[592.679px] left-0 rounded-[14px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] top-0 w-[370.865px]" data-name="Card">
          <LoginScreen />
          
          <form onSubmit={handleSubmit} className="absolute content-stretch flex flex-col gap-[23.992px] items-start left-[32px] top-[215.98px] w-[306.868px]" data-name="LoginScreen">
            {/* Username Input */}
            <div className="h-[49.584px] relative shrink-0 w-full" data-name="Container">
              <div className="absolute bg-[#f3f3f5] h-[49.584px] left-0 rounded-[26821100px] top-0 w-[306.868px]" data-name="Input">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Identifiant"
                  disabled={isLoading}
                  className="content-stretch flex items-center overflow-clip pl-[48px] pr-[16px] py-[24px] relative rounded-[inherit] size-full bg-transparent font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic text-[#364153] text-[16px] tracking-[-0.3125px] outline-none placeholder:text-[#717182] disabled:opacity-50"
                />
                <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[0.799px] border-solid inset-0 pointer-events-none rounded-[26821100px]" />
              </div>
              <div className="absolute content-stretch flex flex-col items-start left-[16px] size-[23.992px] top-[12.8px] pointer-events-none" data-name="Container">
                <Icon />
              </div>
            </div>

            {/* Password Input */}
            <div className="h-[49.584px] relative shrink-0 w-full" data-name="Container">
              <div className="absolute bg-[#f3f3f5] h-[49.584px] left-0 rounded-[26821100px] top-0 w-[306.868px]" data-name="Input">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mot de passe"
                  disabled={isLoading}
                  className="content-stretch flex items-center overflow-clip pl-[48px] pr-[16px] py-[24px] relative rounded-[inherit] size-full bg-transparent font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic text-[#364153] text-[16px] tracking-[-0.3125px] outline-none placeholder:text-[#717182] disabled:opacity-50"
                />
                <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[0.799px] border-solid inset-0 pointer-events-none rounded-[26821100px]" />
              </div>
              <div className="absolute content-stretch flex flex-col items-start left-[16px] size-[23.992px] top-[12.8px] pointer-events-none" data-name="Container">
                <Icon1 />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="bg-[#000e24] h-[47.985px] hover:opacity-100 opacity-50 relative rounded-[26821100px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] shrink-0 w-full transition-opacity cursor-pointer disabled:opacity-30"
              data-name="Button"
            >
              <p className="absolute css-ew64yg font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] left-[137.26px] not-italic text-[18px] text-center text-white top-[10.2px] tracking-[-0.4395px] translate-x-[-50%]">
                {isLoading ? 'Connexion...' : "S'identifier"}
              </p>
              <Icon2 />
            </button>

            {error && (
              <p className="text-red-600 text-center w-full text-sm">{error}</p>
            )}
          </form>

          {/* Demo Credentials */}
          <div className="absolute bg-[#eff6ff] content-stretch flex flex-col gap-[7.993px] h-[101.577px] items-start left-[32px] pt-[15.999px] px-[15.999px] rounded-[10px] top-[459.1px] w-[306.868px]" data-name="LoginScreen">
            <div className="h-[19.996px] relative shrink-0 w-full" data-name="Paragraph">
              <p className="absolute css-ew64yg font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-0 not-italic text-[#364153] text-[14px] top-[0.6px] tracking-[-0.1504px]">Informations de connexion:</p>
            </div>
            
            <div className="h-[20.795px] relative shrink-0 w-full" data-name="Paragraph">
              <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#364153] text-[12px] top-[0.6px] tracking-[-0.1504px]">Utilisez votre email et mot de passe</p>
            </div>
            
            <div className="h-[20.795px] relative shrink-0 w-full" data-name="Paragraph">
              <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#364153] text-[12px] top-[0.6px] tracking-[-0.1504px]">créés dans le tableau Supabase</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}