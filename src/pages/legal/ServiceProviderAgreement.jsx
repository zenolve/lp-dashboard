import { useEffect } from 'react';

export default function ServiceProviderAgreement() {
	useEffect(() => {
		document.title = 'Expert Agreement';
	}, []);

	return (
		// <div>ExpertAgreement</div>
		<div className='mx-auto mb-16 mt-2 block max-w-3xl rounded-md border border-white text-lp-navy'>
			<div className='my-5 text-center font-lp-title-bold text-3xl text-lp-navy'>
				Expert Agreement Terms and Conditions
			</div>
			{/* <p className="text-1xl my-2 font-bold text-lp-navy">PARTIES:</p>
            <ul class="expert-list list" id="parties-list">
                <li data-icon="(1)">
                    Gate Property London Limited incorporated and registered in England
                    and Wales with company number 03830000 whose registered office is at 11 Palace Gate, London W8 5LS
                    (“London Property”).
                </li>
                <li data-icon="(2)">
                    [COMPANY NAME] a company incorporated and registered in England and Wales with company
                    number [NUMBER] whose registered office is at [ADDRESS] (“Expert”).
                    <br></br>
                    OR
                    <br></br>
                    [NAME] of [ADDRESS] (“Expert”).
                </li>
            </ul>
            <p className="text-1xl my-2 font-bold text-lp-navy">BACKGROUND</p>
            <p>
                London Property has certain contacts who may be interested in purchasing services
                from Expert. Expert wishes to be introduced to such contacts, and is willing to pay London
                Property a commission on the terms of this Agreement.
            </p> */}
			<ol className='list-decimal'>
				<li>
					<p className='text-1xl my-2 font-bold text-lp-navy'>DEFINITIONS/INTERPRETATION</p>
					{/* <!-- DEFINITIONS/INTERPRETATION list --> */}
					<ul className='my-2'>
						<li data-icon='1.1'>
							<b>1.1</b> The following words and expressions shall have the following meanings in this Agreement:
						</li>
						<li>
							<table className='my-2'>
								<tr>
									<td>“Commission”</td>
									<td>has the meaning given to it in clause 3.1 below.</td>
								</tr>
								<tr>
									<td>“Data Protection Legislation”</td>
									<td>
										all applicable laws relating to data protection, the processing of personal data and
										privacy in the United Kingdom, including the European Union General Data Protection
										Regulation (Regulation (EU) 2016/679), the Data Protection Act 2018 and any legislation
										designed to supersede or replace them.
									</td>
								</tr>
								<tr>
									<td>“Lead”</td>
									<td>
										a prospective client introduced to You by Us to whom You were not providing any services
										in the six months before the date of the introduction by Us.
									</td>
								</tr>
								<tr>
									<td>“Monthly Report”</td>
									<td>
										the report provided by Expert to London Property each month detailing sales made to
										Leads during the previous month.
									</td>
								</tr>
								<tr>
									<td>“We / Us / Our”</td>
									<td>
										Gate Property London Limited incorporated and registered in England and Wales with
										company number 03830000 whose registered office is at 11 Palace Gate, London W8 5LS.
									</td>
								</tr>
								<tr>
									<td>“You / Your”</td>
									<td>the expert being appointed by Us.</td>
								</tr>
							</table>
						</li>
						<li data-icon='1.2'>
							<b>1.2</b> A reference to a statute or statutory provision is a reference to such statute or
							provision as amended or re-enacted. A reference to a statute or statutory provision includes any
							subordinate legislation made under that statute or statutory provision, as amended or re-enacted. A
							reference to writing or written includes emails. Any phrase introduced by the terms “including”,
							“include”, “in particular” or any similar expression shall be construed as illustrative and shall
							not limit the sense of the words preceding those terms.
						</li>
					</ul>
				</li>
				<li>
					<p className='text-1xl my-2 font-bold text-lp-navy'>YOUR OBLIGATIONS</p>
					{/* <!-- Expert obligations list --> */}
					<ul className='my-2'>
						<li data-icon='2.1'>
							<b>2.1</b> You shall:
						</li>
						{/* <!-- Sub-list --> */}
						<div className='list-inside list-disc' type='A'>
							<li data-icon='(a)'>
								comply with all applicable laws and regulations relating to this Agreement and Your dealings
								with the Leads;
							</li>
							<li data-icon='(b)'>act in good faith towards Us at all times;</li>
							<li data-icon='(c)'>
								not share any information relating to the Leads with any third party without Our prior written
								permission;
							</li>
							<li data-icon='(d)'>
								ensure that You comply with Our reasonable requirements relating to the Leads;
							</li>
							<li data-icon='(e)'>
								promptly notify Us in writing if You enter into any contract to provide services to a Lead and
								shall notify Us of the amount of the payments due for services and the dates on which payments
								for such services are to be made;
							</li>
							<li data-icon='(f)'>not do anything that might damage Our reputation; and</li>
							<li data-icon='(g)'>
								provide Us with all relevant information that We reasonably require to verify the commission
								payable to Us, including the Monthly Report.
							</li>
						</div>
						<li className='my-2' data-icon='2.2'>
							<b>2.2</b> You agree to communicate with Leads using Our chat feature. All communications up to and
							including agreeing terms must be recorded using the platform.
						</li>
						<li className='my-2' data-icon='2.3'>
							<b>2.3</b> You agree to respond to all enquiries in a timely manner and You shall treat Leads with
							courtesy and integrity.
						</li>
						<li className='my-2' data-icon='2.4'>
							<b>2.4</b> Misleading or false information given in the course of providing a service may lead to
							Your account being terminated
						</li>
						<li className='my-2' data-icon='2.5'>
							<b>2.5</b> If You deliberately try to exclude Us from an agreed contract to provide services to any
							Lead, Your access to the platform will cease permanently.
						</li>
						<li className='my-2' data-icon='2.6'>
							<b>2.6</b> We monitor communications between You and Leads as necessary for the operation of Our
							service and as necessary for the purposes of resolving disputes, dealing with any issues that may
							arise and avoiding illegal or inappropriate communications.
						</li>
						<li className='my-2' data-icon='2.7'>
							<b>2.7</b> You shall at all times hold appropriate insurance and shall provide evidence of this to
							Us upon request.
						</li>
					</ul>
				</li>
				<li>
					<p className='text-1xl my-2 font-bold text-lp-navy'>COMMISSION AND PAYMENT</p>
					<ul class='expert-list'>
						<li className='my-2' data-icon='3.1'>
							<b>3.1</b> For a period of one year from date on which You first provides services for a Lead, You
							shall pay Us 10% of all revenue received from that Lead and, subject to clause 2.1(c), any third
							party to whom You introduce that Lead, whether during the term of this Agreement or after its
							termination for any reason (“Commission”).
						</li>
						<li className='my-2' data-icon='3.2'>
							<b>3.2</b> We shall be entitled to invoice for the Commission monthly in arrears. You shall pay any
							invoice provided to it in accordance with the terms of this Agreement within 30 days of receipt of
							such an invoice. Payment shall be made to the bank account nominated in writing by Us.
						</li>
						<li className='my-2' data-icon='3.3'>
							<b>3.3</b> If You fail to make any payment due to Us under this Agreement by the due date for
							payment, then We shall be entitled to charge interest on the overdue amount at the rate of 4% per
							annum above Barclays Bank Plc’s base rate from time to time
						</li>
						<li className='my-2' data-icon='3.4'>
							<b>3.4</b> All amounts payable under this Agreement are exclusive of VAT and any applicable sales
							tax which shall, where applicable, be payable by a party subject to the provision of a valid invoice
							for the same.
						</li>
					</ul>
				</li>
				<li>
					<p className='text-1xl my-2 font-bold text-lp-navy'>AUDIT RIGHTS</p>
					<ul class='expert-list'>
						<li className='my-2' data-icon='4.1'>
							<b>4.1</b> You shall keep separate accounts and records giving correct and adequate details of all
							contracts entered into by You and all payments received under them. You shall, during Your normal
							hours of business, allow Our agents and representatives, to access any of Your premises, personnel,
							facilities, systems and records as may be reasonably required in order to verify Your compliance
							with the terms and conditions of this Agreement.
						</li>
					</ul>
				</li>
				<li>
					<p className='text-1xl my-2 font-bold text-lp-navy'>TERM AND TERMINATION</p>
					<ul class='expert-list'>
						<li className='my-2' data-icon='5.1'>
							<b>5.1</b> Either We or You may terminate this Agreement immediately by notice in writing if the
							other:
						</li>
						<div className='list-inside list-disc'>
							<li data-icon='(a)'>
								commits a material breach of any term of this Agreement and (if such a breach is remediable)
								fails to remedy that breach within 14 days of that party being notified in writing to do so; or
							</li>
							<li data-icon='(b)'>
								suspends, or threatens to suspend, payment of its debts or is unable to pay its debts within the
								meaning of section 123 of the Insolvency Act 1996; enters into or applies for (or calls meetings
								of members or creditors with a view to) one or more of a moratorium, winding up, administration,
								liquidation (of any kind, including provisional), or composition or arrangement with creditors;
								or has any of its property subjected to one or more of the appointment of a receiver (of any
								kind), enforcement of security, distress, or execution of a judgment (in each case to include
								similar events under the laws of other countries).
							</li>
						</div>
						<li className='my-2' data-icon='5.2'>
							<b>5.2</b> Any provision of this Agreement either expressed or implied to survive termination shall
							survive termination howsoever occasioned, including clauses 2, 3, 4 and 6.
						</li>
						<li className='my-2' data-icon='5.3'>
							<b>5.3</b> Following termination of this Agreement, each party will provide the other with such
							reasonable degree of assistance as is reasonably required to enable the parties to affect an orderly
							termination of this Agreement.
						</li>
					</ul>
				</li>
				<li>
					<p className='text-1xl my-2 font-bold text-lp-navy'>CONFIDENTIALITY</p>
					<ul class='expert-list'>
						<li className='my-2' data-icon='6.1'>
							<b>6.1</b> Each party undertakes that it shall not at any time disclose to any person any
							confidential information concerning the business, affairs, customers, clients or suppliers of the
							other party, except as permitted by clause 6.2.
						</li>
						<li className='my-2' data-icon='6.2'>
							<b>6.2</b> Each party may disclose the other party's confidential information:
						</li>
						<div className='list-inside list-disc'>
							<li data-icon='(a)'>
								to its employees, officers, representatives or advisers who need to know such information for
								the purposes of exercising the party's rights or carrying out its obligations under or in
								connection with this Agreement. Each party shall ensure that its employees, officers,
								representatives or advisers to whom it discloses the other party's confidential information
								comply with this clause 6; and
							</li>
							<li data-icon='(b)'>
								as may be required by law, a court of competent jurisdiction or any governmental or regulatory
								authority.
							</li>
						</div>
						<li className='my-2' data-icon='6.3'>
							<b>6.3</b> No party shall use the other party's confidential information for any purpose other than
							the performance of this Agreement.
						</li>
					</ul>
				</li>
				<li>
					<p className='text-1xl my-2 font-bold text-lp-navy'>DATA PROTECTION</p>
					<ul class='expert-list'>
						<li className='my-2' data-icon='7.1'>
							<b>7.1</b> In addition to complying with the obligations of confidentiality under this Agreement
							each party shall:
						</li>
						<div className='list-inside list-disc'>
							<li data-icon='(a)'>
								obtain and maintain all appropriate registrations and consents under the Data Protection
								Legislation in order to allow that party to perform its obligations under this Agreement;
							</li>
							<li data-icon='(b)'>
								process all personal data in accordance with the Data Protection Legislation; and
							</li>
							<li data-icon='(c)'>
								make sure that no act or omission by that party, its employees, contractors or agents results in
								a breach of the obligations of the other party under the Data Protection Legislation.
							</li>
						</div>
					</ul>
				</li>
				<li>
					<p className='text-1xl my-2 font-bold text-lp-navy'>NOTICES</p>
					Any notice or other communication given to a party under or in connection with this Agreement shall be in
					writing, addressed to and shall be delivered personally, or sent by pre-paid first class post or other next
					working day delivery service, commercial courier or email.
				</li>
				<li>
					<p className='text-1xl my-2 font-bold text-lp-navy'>GENERAL</p>
					<ul class='expert-list'>
						<li className='my-2' data-icon='9.1'>
							<b>9.1</b> This Agreement constitutes the entire agreement between the parties and supersedes and
							extinguishes all previous agreements, promises, assurances, warranties, representations and
							understandings between them, whether written or oral, relating to its subject matter.
						</li>
						<li className='my-2' data-icon='9.2'>
							<b>9.2</b> Nothing in this Agreement and no action taken by the parties pursuant to this Agreement
							shall be construed as creating a partnership or joint venture of any kind between the parties or as
							constituting either party as the agent of the other party for any purpose whatsoever. No party shall
							have the authority to bind the other party or to contract in the name of or create a liability
							against the other party in any way or for any purpose.
						</li>
						<li className='my-2' data-icon='9.3'>
							<b>9.3</b> No one other than a party to this Agreement shall have any right to enforce any of its
							terms.
						</li>
						<li className='my-2' data-icon='9.4'>
							<b>9.4</b> Except as expressly provided under this Agreement, the rights and remedies contained in
							this Agreement are cumulative and are not exclusive of any other rights or remedies provided by law
							or otherwise.
						</li>
						<li className='my-2' data-icon='9.5'>
							<b>9.5</b> No failure or delay by a party to exercise any right or remedy provided under this
							Agreement or by law shall constitute a waiver of that or any other right or remedy, nor shall it
							prevent or restrict the further exercise of that or any other right or remedy. No single or partial
							exercise of such right or remedy shall prevent or restrict the further exercise of that or any other
							right or remedy.
						</li>
						<li className='my-2' data-icon='9.6'>
							<b>9.6</b> Neither party shall assign, transfer, charge, create a trust over or otherwise deal in
							its rights and/or obligations under this Agreement (or purport to do so) without the other party's
							prior written consent.
						</li>
						<li className='my-2' data-icon='9.7'>
							<b>9.7</b> If any provision or part-provision of this Agreement is or becomes invalid, illegal or
							unenforceable, it shall be deemed modified to the minimum extent necessary to make it valid, legal
							and enforceable. If such modification is not possible, the relevant provision or part-provision
							shall be deemed deleted. Any modification to or deletion of a provision or part-provision under this
							clause 9.7 shall not affect the validity and enforceability of the rest of this Agreement.
						</li>
						<li className='my-2' data-icon='9.8'>
							<b>9.8</b> This Agreement shall be governed by and construed in accordance with English law. The
							English courts shall have exclusive jurisdiction to determine any disputes which may arise out of,
							under, or in connection with this Agreement.
						</li>
					</ul>
				</li>
			</ol>
		</div>
	);
}
