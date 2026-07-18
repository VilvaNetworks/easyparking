import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy - Easy Parking Ltd',
  description: 'This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights.',
  alternates: {
    canonical: '/privacy-policy',
  },
};

const privacyPolicySchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.easyparkingltd.com/privacy-policy#webpage",
      "url": "https://www.easyparkingltd.com/privacy-policy",
      "name": "Privacy Policy - Easy Parking Ltd",
      "description": "This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights.",
      "breadcrumb": {
        "@id": "https://www.easyparkingltd.com/privacy-policy#breadcrumb"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.easyparkingltd.com/privacy-policy#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.easyparkingltd.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Privacy Policy",
          "item": "https://www.easyparkingltd.com/privacy-policy"
        }
      ]
    }
  ]
};

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full bg-[#faf9f6] text-[#2c3e50] font-sans pb-16 md:pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(privacyPolicySchema) }}
      />
      
      {/* ================= HEADER BANNER ================= */}
      <section className="relative w-full h-[240px] md:h-[300px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/how-banner.png"
            alt="Privacy Policy Banner"
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/45" />
        </div>
        <div className="relative z-10 text-center px-4 mt-6">
          <h1 className="text-white text-[32px] sm:text-[40px] md:text-[50px] font-extrabold tracking-[4px] uppercase font-sans">
            Privacy Policy
          </h1>
        </div>
      </section>

      {/* ================= CONTENT SECTION ================= */}
      <section className="w-full py-12 md:py-20 px-4 sm:px-6 md:px-8">
        <div className="max-w-[1000px] mx-auto border border-gray-200 bg-white p-6 sm:p-8 md:p-12 shadow-sm rounded-2xl border-t-4 border-t-[#e7701e]">
          
          <div className="border-b border-gray-200 pb-6 mb-8">
            <h2 className="text-[#1a1a1a] text-[22px] sm:text-[26px] font-extrabold font-sans mb-2">
              Privacy Policy Statement
            </h2>
            <p className="text-[13px] sm:text-[14px] text-gray-500 font-semibold uppercase tracking-wider">
              Last Updated: December 22, 2025
            </p>
          </div>

          <div className="space-y-8 text-[#4a4a4a] text-[15px] sm:text-[16px] leading-[1.8]">
            
            {/* Intro */}
            <div className="space-y-4">
              <p>
                This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.
              </p>
              <p>
                We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy.
              </p>
            </div>

            {/* Interpretation and Definitions */}
            <div className="space-y-4 border-t border-gray-100 pt-6">
              <h3 className="text-[#002f5d] font-extrabold text-[18px] sm:text-[20px] tracking-tight">
                Interpretation and Definitions
              </h3>
              
              <div className="space-y-3">
                <h4 className="text-[#1a1a1a] font-bold text-[16px]">Interpretation</h4>
                <p>
                  The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
                </p>
              </div>

              <div className="space-y-4 pt-2">
                <h4 className="text-[#1a1a1a] font-bold text-[16px]">Definitions</h4>
                <p className="italic">For the purposes of this Privacy Policy:</p>
                
                <ul className="space-y-4 pl-4 border-l-2 border-[#e7701e]/30">
                  <li>
                    <strong className="text-[#002f5d]">Account</strong> means a unique account created for You to access our Service or parts of our Service.
                  </li>
                  <li>
                    <strong className="text-[#002f5d]">Affiliate</strong> means an entity that controls, is controlled by or is under common control with a party, where &ldquo;control&rdquo; means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.
                  </li>
                  <li>
                    <strong className="text-[#002f5d]">Company</strong> (referred to as either &ldquo;the Company&rdquo;, &ldquo;We&rdquo;, &ldquo;Us&rdquo; or &ldquo;Our&rdquo; in this Agreement) refers to Easy Parking LTD, London, United Kingdom.
                  </li>
                  <li>
                    <strong className="text-[#002f5d]">Cookies</strong> are small files that are placed on Your computer, mobile device or any other device by a website, containing the details of Your browsing history on that website among its many uses.
                  </li>
                  <li>
                    <strong className="text-[#002f5d]">Country</strong> refers to: United Kingdom
                  </li>
                  <li>
                    <strong className="text-[#002f5d]">Device</strong> means any device that can access the Service such as a computer, a cellphone or a digital tablet.
                  </li>
                  <li>
                    <strong className="text-[#002f5d]">Personal Data</strong> is any information that relates to an identified or identifiable individual.
                  </li>
                  <li>
                    <strong className="text-[#002f5d]">Service</strong> refers to the Website.
                  </li>
                  <li>
                    <strong className="text-[#002f5d]">Service Provider</strong> means any natural or legal person who processes the data on behalf of the Company. It refers to third-party companies or individuals employed by the Company to facilitate the Service, to provide the Service on behalf of the Company, to perform services related to the Service or to assist the Company in analyzing how the Service is used.
                  </li>
                  <li>
                    <strong className="text-[#002f5d]">Usage Data</strong> refers to data collected automatically, either generated by the use of the Service or from the Service infrastructure itself (for example, the duration of a page visit).
                  </li>
                  <li>
                    <strong className="text-[#002f5d]">Website</strong> refers to Easy Parking LTD, accessible from <a href="https://www.easyparkingltd.com/" target="_blank" rel="noreferrer noopener" className="text-[#e7701e] hover:underline">https://www.easyparkingltd.com</a>.
                  </li>
                  <li>
                    <strong className="text-[#002f5d]">You</strong> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.
                  </li>
                </ul>
              </div>
            </div>

            {/* Collecting and Using Personal Data */}
            <div className="space-y-4 border-t border-gray-100 pt-6">
              <h3 className="text-[#002f5d] font-extrabold text-[18px] sm:text-[20px] tracking-tight">
                Collecting and Using Your Personal Data
              </h3>
              
              <div className="space-y-4">
                <h4 className="text-[#1a1a1a] font-bold text-[16px] border-b border-gray-100 pb-1">Types of Data Collected</h4>
                
                <div className="space-y-3">
                  <h5 className="text-[#002f5d] font-bold text-[15px]">Personal Data</h5>
                  <p>
                    While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Email address</li>
                    <li>Usage Data</li>
                  </ul>
                </div>

                <div className="space-y-3 pt-2">
                  <h5 className="text-[#002f5d] font-bold text-[15px]">Usage Data</h5>
                  <p>Usage Data is collected automatically when using the Service.</p>
                  <p>
                    Usage Data may include information such as Your Device&rsquo;s Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that You visit, the time and date of Your visit, the time spent on those pages, unique device identifiers and other diagnostic data.
                  </p>
                  <p>
                    When You access the Service by or through a mobile device, We may collect certain information automatically, including, but not limited to, the type of mobile device You use, Your mobile device unique ID, the IP address of Your mobile device, Your mobile operating system, the type of mobile Internet browser You use, unique device identifiers and other diagnostic data.
                  </p>
                  <p>
                    We may also collect information that Your browser sends whenever You visit our Service or when You access the Service by or through a mobile device.
                  </p>
                </div>
              </div>
            </div>

            {/* Tracking Technologies and Cookies */}
            <div className="space-y-4 border-t border-gray-100 pt-6">
              <h3 className="text-[#002f5d] font-extrabold text-[18px] sm:text-[20px] tracking-tight">
                Tracking Technologies and Cookies
              </h3>
              <p>
                We use Cookies and similar tracking technologies to track the activity on Our Service and store certain information. Tracking technologies used are beacons, tags, and scripts to collect and track information and to improve and analyze Our Service. The technologies We use may include:
              </p>
              
              <ul className="list-decimal pl-6 space-y-3">
                <li>
                  <strong>Cookies or Browser Cookies.</strong> A cookie is a small file placed on Your Device. You can instruct Your browser to refuse all Cookies or to indicate when a Cookie is being sent. However, if You do not accept Cookies, You may not be able to use some parts of our Service. Unless you have adjusted Your browser setting so that it will refuse Cookies, our Service may use Cookies.
                </li>
                <li>
                  <strong>Web Beacons.</strong> Certain sections of our Service and our emails may contain small electronic files known as web beacons (also referred to as clear gifs, pixel tags, and single-pixel gifs) that permit the Company, for example, to count users who have visited those pages or opened an email and for other related website statistics (for example, recording the popularity of a certain section and verifying system and server integrity).
                </li>
              </ul>

              <p>
                Cookies can be &ldquo;Persistent&rdquo; or &ldquo;Session&rdquo; Cookies. Persistent Cookies remain on Your personal computer or mobile device when You go offline, while Session Cookies are deleted as soon as You close Your web browser.
              </p>

              <div className="space-y-4 pt-2">
                <h4 className="text-[#1a1a1a] font-bold text-[16px]">We use both Session and Persistent Cookies for the purposes set out below:</h4>
                
                <div className="space-y-4 pl-4 border-l-2 border-[#e7701e]/30">
                  <div className="space-y-1">
                    <h5 className="text-[#002f5d] font-bold text-[15px]">Necessary / Essential Cookies</h5>
                    <p className="text-[14px] text-gray-500 font-medium">Type: Session Cookies | Administered by: Us</p>
                    <p className="text-[#4a4a4a]">
                      Purpose: These Cookies are essential to provide You with services available through the Website and to enable You to use some of its features. They help to authenticate users and prevent fraudulent use of user accounts. Without these Cookies, the services that You have asked for cannot be provided, and We only use these Cookies to provide You with those services.
                    </p>
                  </div>

                  <div className="space-y-1 pt-2">
                    <h5 className="text-[#002f5d] font-bold text-[15px]">Cookies Policy / Notice Acceptance Cookies</h5>
                    <p className="text-[14px] text-gray-500 font-medium">Type: Persistent Cookies | Administered by: Us</p>
                    <p className="text-[#4a4a4a]">
                      Purpose: These Cookies identify if users have accepted the use of cookies on the Website.
                    </p>
                  </div>

                  <div className="space-y-1 pt-2">
                    <h5 className="text-[#002f5d] font-bold text-[15px]">Functionality Cookies</h5>
                    <p className="text-[14px] text-gray-500 font-medium">Type: Persistent Cookies | Administered by: Us</p>
                    <p className="text-[#4a4a4a]">
                      Purpose: These Cookies allow us to remember choices You make when You use the Website, such as remembering your login details or language preference. The purpose of these Cookies is to provide You with a more personal experience and to avoid You having to re-enter your preferences every time You use the Website.
                    </p>
                  </div>
                </div>
              </div>

              <p className="pt-2">
                For more information about the cookies we use and your choices regarding cookies, please visit our Cookies Policy or the Cookies section of our Privacy Policy.
              </p>
            </div>

            {/* Use of Your Personal Data */}
            <div className="space-y-4 border-t border-gray-100 pt-6">
              <h3 className="text-[#002f5d] font-extrabold text-[18px] sm:text-[20px] tracking-tight">
                Use of Your Personal Data
              </h3>
              <p>The Company may use Personal Data for the following purposes:</p>
              
              <ul className="space-y-3.5 list-none p-0 m-0 pl-1">
                <li className="flex gap-3 items-start">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#e7701e] text-white flex items-center justify-center font-bold text-[11px] mt-0.5">1</span>
                  <p className="flex-1"><strong className="text-[#1a1a1a]">To provide and maintain our Service</strong>, including to monitor the usage of our Service.</p>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#e7701e] text-white flex items-center justify-center font-bold text-[11px] mt-0.5">2</span>
                  <p className="flex-1"><strong className="text-[#1a1a1a]">To manage Your Account:</strong> to manage Your registration as a user of the Service. The Personal Data You provide can give You access to different functionalities of the Service that are available to You as a registered user.</p>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#e7701e] text-white flex items-center justify-center font-bold text-[11px] mt-0.5">3</span>
                  <p className="flex-1"><strong className="text-[#1a1a1a]">For the performance of a contract:</strong> the development, compliance and undertaking of the purchase contract for the products, items or services You have purchased or of any other contract with Us through the Service.</p>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#e7701e] text-white flex items-center justify-center font-bold text-[11px] mt-0.5">4</span>
                  <p className="flex-1"><strong className="text-[#1a1a1a]">To contact You:</strong> To contact You by email, telephone calls, SMS, or other equivalent forms of electronic communication, such as a mobile application&rsquo;s push notifications regarding updates or informative communications related to the functionalities, products or contracted services, including the security updates, when necessary or reasonable for their implementation.</p>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#e7701e] text-white flex items-center justify-center font-bold text-[11px] mt-0.5">5</span>
                  <p className="flex-1"><strong className="text-[#1a1a1a]">To provide You</strong> with news, special offers and general information about other goods, services and events which we offer that are similar to those that you have already purchased or enquired about unless You have opted not to receive such information.</p>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#e7701e] text-white flex items-center justify-center font-bold text-[11px] mt-0.5">6</span>
                  <p className="flex-1"><strong className="text-[#1a1a1a]">To manage Your requests:</strong> To attend and manage Your requests to Us.</p>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#e7701e] text-white flex items-center justify-center font-bold text-[11px] mt-0.5">7</span>
                  <p className="flex-1"><strong className="text-[#1a1a1a]">For business transfers:</strong> We may use Your information to evaluate or conduct a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of Our assets, whether as a going concern or as part of bankruptcy, liquidation, or similar proceeding, in which Personal Data held by Us about our Service users is among the assets transferred.</p>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#e7701e] text-white flex items-center justify-center font-bold text-[11px] mt-0.5">8</span>
                  <p className="flex-1"><strong className="text-[#1a1a1a]">For other purposes:</strong> We may use Your information for other purposes, such as data analysis, identifying usage trends, determining the effectiveness of our promotional campaigns and to evaluate and improve our Service, products, services, marketing and your experience.</p>
                </li>
              </ul>

              <div className="space-y-4 pt-4">
                <h4 className="text-[#1a1a1a] font-bold text-[16px]">We may share Your personal information in the following situations:</h4>
                <ul className="list-disc pl-6 space-y-2.5">
                  <li>
                    <strong>With Service Providers:</strong> We may share Your personal information with Service Providers to monitor and analyze the use of our Service, to contact You.
                  </li>
                  <li>
                    <strong>For business transfers:</strong> We may share or transfer Your personal information in connection with, or during negotiations of, any merger, sale of Company assets, financing, or acquisition of all or a portion of Our business to another company.
                  </li>
                  <li>
                    <strong>With Affiliates:</strong> We may share Your information with Our affiliates, in which case we will require those affiliates to honor this Privacy Policy. Affiliates include Our parent company and any other subsidiaries, joint venture partners or other companies that We control or that are under common control with Us.
                  </li>
                  <li>
                    <strong>With business partners:</strong> We may share Your information with Our business partners to offer You certain products, services or promotions.
                  </li>
                  <li>
                    <strong>With other users:</strong> when You share personal information or otherwise interact in the public areas with other users, such information may be viewed by all users and may be publicly distributed outside.
                  </li>
                  <li>
                    <strong>With Your consent:</strong> We may disclose Your personal information for any other purpose with Your consent.
                  </li>
                </ul>
              </div>
            </div>

            {/* Retention of Your Personal Data */}
            <div className="space-y-4 border-t border-gray-100 pt-6">
              <h3 className="text-[#002f5d] font-extrabold text-[18px] sm:text-[20px] tracking-tight">
                Retention of Your Personal Data
              </h3>
              <p>
                The Company will retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use Your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.
              </p>
              <p>
                The Company will also retain Usage Data for internal analysis purposes. Usage Data is generally retained for a shorter period of time, except when this data is used to strengthen the security or to improve the functionality of Our Service, or We are legally obligated to retain this data for longer time periods.
              </p>
            </div>

            {/* Transfer of Your Personal Data */}
            <div className="space-y-4 border-t border-gray-100 pt-6">
              <h3 className="text-[#002f5d] font-extrabold text-[18px] sm:text-[20px] tracking-tight">
                Transfer of Your Personal Data
              </h3>
              <p>
                Your information, including Personal Data, is processed at the Company&rsquo;s operating offices and in any other places where the parties involved in the processing are located. It means that this information may be transferred to &mdash; and maintained on &mdash; computers located outside of Your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from Your jurisdiction.
              </p>
              <p>
                Your consent to this Privacy Policy followed by Your submission of such information represents Your agreement to that transfer.
              </p>
              <p>
                The Company will take all steps reasonably necessary to ensure that Your data is treated securely and in accordance with this Privacy Policy and no transfer of Your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of Your data and other personal information.
              </p>
            </div>

            {/* Delete Your Personal Data */}
            <div className="space-y-4 border-t border-gray-100 pt-6">
              <h3 className="text-[#002f5d] font-extrabold text-[18px] sm:text-[20px] tracking-tight">
                Delete Your Personal Data
              </h3>
              <p>
                You have the right to delete or request that We assist in deleting the Personal Data that We have collected about You.
              </p>
              <p>
                Our Service may give You the ability to delete certain information about You from within the Service.
              </p>
              <p>
                You may update, amend, or delete Your information at any time by signing in to Your Account, if you have one, and visiting the account settings section that allows you to manage Your personal information. You may also contact Us to request access to, correct, or delete any personal information that You have provided to Us.
              </p>
              <p>
                Please note, however, that We may need to retain certain information when we have a legal obligation or lawful basis to do so.
              </p>
            </div>

            {/* Disclosure of Your Personal Data */}
            <div className="space-y-4 border-t border-gray-100 pt-6">
              <h3 className="text-[#002f5d] font-extrabold text-[18px] sm:text-[20px] tracking-tight">
                Disclosure of Your Personal Data
              </h3>
              
              <div className="space-y-4">
                <h4 className="text-[#1a1a1a] font-bold text-[16px]">Business Transactions</h4>
                <p>
                  If the Company is involved in a merger, acquisition or asset sale, Your Personal Data may be transferred. We will provide notice before Your Personal Data is transferred and becomes subject to a different Privacy Policy.
                </p>
              </div>

              <div className="space-y-4 pt-2">
                <h4 className="text-[#1a1a1a] font-bold text-[16px]">Law enforcement</h4>
                <p>
                  Under certain circumstances, the Company may be required to disclose Your Personal Data if required to do so by law or in response to valid requests by public authorities (e.g. a court or a government agency).
                </p>
              </div>

              <div className="space-y-4 pt-2">
                <h4 className="text-[#1a1a1a] font-bold text-[16px]">Other legal requirements</h4>
                <p>The Company may disclose Your Personal Data in the good faith belief that such action is necessary to:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Comply with a legal obligation</li>
                  <li>Protect and defend the rights or property of the Company</li>
                  <li>Prevent or investigate possible wrongdoing in connection with the Service</li>
                  <li>Protect the personal safety of Users of the Service or the public</li>
                  <li>Protect against legal liability</li>
                </ul>
              </div>
            </div>

            {/* Security of Your Personal Data */}
            <div className="space-y-4 border-t border-gray-100 pt-6">
              <h3 className="text-[#002f5d] font-extrabold text-[18px] sm:text-[20px] tracking-tight">
                Security of Your Personal Data
              </h3>
              <p>
                The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While We strive to use commercially acceptable means to protect Your Personal Data, We cannot guarantee its absolute security.
              </p>
            </div>

            {/* Detailed Information on processing */}
            <div className="space-y-4 border-t border-gray-100 pt-6">
              <h3 className="text-[#002f5d] font-extrabold text-[18px] sm:text-[20px] tracking-tight">
                Detailed Information on the Processing of Your Personal Data
              </h3>
              <p>
                The Service Providers We use may have access to Your Personal Data. These third-party vendors collect, store, use, process and transfer information about Your activity on Our Service in accordance with their Privacy Policies.
              </p>

              <div className="space-y-3 pt-2">
                <h4 className="text-[#1a1a1a] font-bold text-[16px]">Usage, Performance and Miscellaneous</h4>
                <p>We may use third-party Service Providers to maintain and improve our Service.</p>
                
                <div className="pl-4 border-l-2 border-[#e7701e]/30 pt-1">
                  <strong className="text-[#002f5d] block text-[15px] mb-1">Google Places</strong>
                  <p>
                    Google Places is a service that returns information about places using HTTP requests. It is operated by Google.
                  </p>
                  <p className="mt-1.5">
                    Google Places service may collect information from You and from Your Device for security purposes.
                  </p>
                  <p className="mt-1.5">
                    The information gathered by Google Places is held in accordance with the Privacy Policy of Google: <a href="https://www.google.com/intl/en/policies/privacy/" target="_blank" rel="noreferrer noopener nofollow" className="text-[#e7701e] hover:underline">https://www.google.com/intl/en/policies/privacy/</a>
                  </p>
                </div>
              </div>
            </div>

            {/* Children's Privacy */}
            <div className="space-y-4 border-t border-gray-100 pt-6">
              <h3 className="text-[#002f5d] font-extrabold text-[18px] sm:text-[20px] tracking-tight">
                Children&rsquo;s Privacy
              </h3>
              <p>
                Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under the age of 13. If You are a parent or guardian and You are aware that Your child has provided Us with Personal Data, please contact Us. If We become aware that We have collected Personal Data from anyone under the age of 13 without verification of parental consent, We take steps to remove that information from Our servers.
              </p>
              <p>
                If We need to rely on consent as a legal basis for processing Your information and Your country requires consent from a parent, We may require Your parent&rsquo;s consent before We collect and use that information.
              </p>
            </div>

            {/* Links to Other Websites */}
            <div className="space-y-4 border-t border-gray-100 pt-6">
              <h3 className="text-[#002f5d] font-extrabold text-[18px] sm:text-[20px] tracking-tight">
                Links to Other Websites
              </h3>
              <p>
                Our Service may contain links to other websites that are not operated by Us. If You click on a third party link, You will be directed to that third party&rsquo;s site. We strongly advise You to review the Privacy Policy of every site You visit.
              </p>
              <p>
                We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.
              </p>
            </div>

            {/* Changes to this Privacy Policy */}
            <div className="space-y-4 border-t border-gray-100 pt-6">
              <h3 className="text-[#002f5d] font-extrabold text-[18px] sm:text-[20px] tracking-tight">
                Changes to this Privacy Policy
              </h3>
              <p>
                We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page.
              </p>
              <p>
                We will let You know via email and/or a prominent notice on Our Service, prior to the change becoming effective and update the &ldquo;Last updated&rdquo; date at the top of this Privacy Policy.
              </p>
              <p>
                You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
              </p>
            </div>

            {/* Contact Us */}
            <div className="space-y-4 border-t border-gray-100 pt-6 pb-4">
              <h3 className="text-[#002f5d] font-extrabold text-[18px] sm:text-[20px] tracking-tight">
                Contact Us
              </h3>
              <p>If you have any questions about this Privacy Policy, You can contact us:</p>
              <ul className="list-none p-0 m-0 pl-1 space-y-2">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#e7701e]" />
                  <p>
                    By email: <a href="mailto:info@easyparkingltd.com" className="text-[#e7701e] font-semibold hover:underline">info@easyparkingltd.com</a>
                  </p>
                </li>
              </ul>
            </div>

          </div>

          {/* Action CTA */}
          <div className="mt-12 border-t border-gray-200 pt-8 text-center">
            <Link
              href="/"
              className="inline-block bg-[#e7701e] hover:bg-[#d56113] text-white font-bold text-[15px] px-10 py-[12px] rounded-[6px] transition-all duration-300 hover:-translate-y-0.5 shadow-md shadow-orange-500/20"
            >
              Back to Home
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}
