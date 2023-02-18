import { Form, FormGroup, FormLabel, Table } from "react-bootstrap";
import { fieldNames, NEW_VALUE_OF_SERVICE } from "../constants.mjs";
import DynamicTable from "../components/DynamicTable";
import { useEffect } from "react";
import Heading from "../components/Heading";
import Errors from "../components/Errors.jsx";

/** todo: need to check this out. there's probably an error here */
const valueOfServiceProvidedColumns = [
	{
		name: "Type of Service",
		key: fieldNames.localContent.valueOfServiceProvided.typeOfService,
	},
	{
		name: "Contract Sum",
		key: fieldNames.localContent.valueOfServiceProvided.contractSum,
	},
	{
		name: "Name of Company (Customer)",
		key: fieldNames.localContent.valueOfServiceProvided.nameOfClientCompany,
	},
];

const valueOfServiceReceivedColumns = [
	{
		name: "Type of Service",
		key: fieldNames.localContent.valueOfServiceReceived.typeOfService,
	},
	{
		name: "Contract Sum",
		key: fieldNames.localContent.valueOfServiceReceived.contractSum,
	},
	{
		name: "Name of Company (Client)",
		key: fieldNames.localContent.valueOfServiceReceived.nameOfClientCompany,
	},
];

const getFieldValues = (data) => {
	const getLocalContentField = (fieldName) =>
		data[fieldNames.localContent._][fieldName];

	const percentageOfGhanaianParticipation =
		data[fieldNames.localContent._][
			fieldNames.localContent.percentageOfGhanaianParticipation
		];
	const ghanaianMgtStaffBreakdown =
		data[fieldNames.localContent._][
			fieldNames.localContent.ghanaianMgtStaffBreakdown
		];
	const foreignMgtStaffBreakdown = getLocalContentField(
		fieldNames.localContent.foreignMgtStaffBreakdown
	);
	const totalMgtStaffBreakdown = getLocalContentField(
		fieldNames.localContent.totalMgtStaffBreakdown
	);
	const ghanaianOtherStaffBreakdown = getLocalContentField(
		fieldNames.localContent.ghanaianOtherStaffBreakdown
	);
	const foreignOtherStaffBreakdown = getLocalContentField(
		fieldNames.localContent.foreignOtherStaffBreakdown
	);
	const totalOtherStaffBreakdown = getLocalContentField(
		fieldNames.localContent.totalOtherStaffBreakdown
	);

	const infraExpenditure =
		data[fieldNames.localContent._][
			fieldNames.localContent.infraExpenditure
		];
	const valueOfServiceProvided =
		data[fieldNames.localContent._][
			fieldNames.localContent.valueOfServiceProvided._
		];
	const valueOfServiceReceived =
		data[fieldNames.localContent._][
			fieldNames.localContent.valueOfServiceReceived._
		];
	const ghanaianFinishedGoods =
		data[fieldNames.localContent._][
			fieldNames.localContent.ghanaianFinishedGoods
		];
	const rawMaterials =
		data[fieldNames.localContent._][fieldNames.localContent.rawMaterials];

	return {
		percentageOfGhanaianParticipation,
		ghanaianMgtStaffBreakdown,
		foreignMgtStaffBreakdown,
		ghanaianOtherStaffBreakdown,
		foreignOtherStaffBreakdown,
		totalMgtStaffBreakdown,
		totalOtherStaffBreakdown,
		infraExpenditure,
		valueOfServiceProvided,
		valueOfServiceReceived,
		rawMaterials,
		ghanaianFinishedGoods,
	};
};

const fields = fieldNames.localContent;

const getError = (field, errors) => {
	return errors?.[fields._]?.[field];
};

function LocalContent({ data, setData, errors, setErrors }) {
	const {
		percentageOfGhanaianParticipation,
		ghanaianMgtStaffBreakdown,
		foreignMgtStaffBreakdown,
		totalMgtStaffBreakdown,
		ghanaianOtherStaffBreakdown,
		foreignOtherStaffBreakdown,
		totalOtherStaffBreakdown,
		infraExpenditure,
		valueOfServiceProvided,
		valueOfServiceReceived,
		ghanaianFinishedGoods,
		rawMaterials,
	} = getFieldValues(data);

	const onChange = (field, value) => {
		setData((prev) => ({
			...prev,
			[fieldNames.localContent._]: {
				...prev[fieldNames.localContent._],
				[field]: value,
			},
		}));
	};

	useEffect(() => {
		setData((prev) => {
			const newTotalMgtStaff =
				parseInt(ghanaianMgtStaffBreakdown) +
				parseInt(foreignMgtStaffBreakdown);

			const newTotalOtherStaff =
				parseInt(ghanaianOtherStaffBreakdown) +
				parseInt(foreignOtherStaffBreakdown);

			return {
				...prev,
				[fields._]: {
					...prev[fields._],
					[fields.totalMgtStaffBreakdown]: newTotalMgtStaff,
					[fields.totalOtherStaffBreakdown]: newTotalOtherStaff,
				},
			};
		});
	}, [
		foreignOtherStaffBreakdown,
		foreignMgtStaffBreakdown,
		ghanaianMgtStaffBreakdown,
		ghanaianOtherStaffBreakdown,
		setData,
	]);

	// console.table("values -> ", {
	// 	percentageOfGhanaianParticipation,
	// 	infraExpenditure,
	// 	valueOfServiceProvided,
	//   valueOfServiceReceived,
	//   totalMgtStaffBreakdown,
	//   totalOtherStaffBreakdown,
	// });

	return (
		<Form>
			<Heading>Part 4 - Local Content</Heading>
			<hr />

			<FormGroup>
				<FormLabel>
					1. Provide the percentage of Ghanaian participation in
					respect of ownership *
				</FormLabel>
				<Errors
					errors={getError(
						fields.percentageOfGhanaianParticipation,
						errors
					)}
				/>
				<Form.Control
					type="number"
					value={percentageOfGhanaianParticipation}
					onChange={(e) =>
						onChange(
							fieldNames.localContent
								.percentageOfGhanaianParticipation,
							e.target.value
						)
					}
				/>
			</FormGroup>

			<FormGroup>
				<FormLabel>
					2. Employment: Please provide a breakdown of your company's
					staff *
				</FormLabel>
				<Table>
					<thead>
						<tr>
							<th></th>
							<th>Number of Ghanaians</th>
							<th>Number of Foreigners</th>
							<th>Total</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Management</td>
							<td>
								<Errors
									errors={getError(
										fields.ghanaianMgtStaffBreakdown,
										errors
									)}
								/>
								<Form.Control
									type="number"
									value={ghanaianMgtStaffBreakdown}
									onChange={(e) => {
										onChange(
											fieldNames.localContent
												.ghanaianMgtStaffBreakdown,
											e.target.value
										);
									}}
								/>
							</td>
							<td>
								<Errors
									errors={getError(
										fields.foreignMgtStaffBreakdown,
										errors
									)}
								/>
								<Form.Control
									type="number"
									value={foreignMgtStaffBreakdown}
									onChange={(e) => {
										onChange(
											fieldNames.localContent
												.foreignMgtStaffBreakdown,
											e.target.value
										);
									}}
								/>
							</td>
							<td>
								<Errors
									errors={getError(
										fields.totalMgtStaffBreakdown,
										errors
									)}
								/>
								<Form.Control
									type="number"
									value={totalMgtStaffBreakdown}
									onChange={(e) => {
										onChange(
											fieldNames.localContent
												.totalMgtStaffBreakdown,
											e.target.value
										);
									}}
								/>
							</td>
						</tr>
						<tr>
							<td>Other Positions</td>
							<td>
								<Errors
									errors={getError(
										fields.ghanaianOtherStaffBreakdown,
										errors
									)}
								/>
								<Form.Control
									type="number"
									value={ghanaianOtherStaffBreakdown}
									onChange={(e) => {
										onChange(
											fieldNames.localContent
												.ghanaianOtherStaffBreakdown,
											e.target.value
										);
									}}
								/>
							</td>
							<td>
								<Errors
									errors={getError(
										fields.foreignOtherStaffBreakdown,
										errors
									)}
								/>
								<Form.Control
									type="number"
									value={foreignOtherStaffBreakdown}
									onChange={(e) => {
										onChange(
											fieldNames.localContent
												.foreignOtherStaffBreakdown,
											e.target.value
										);
									}}
								/>
							</td>
							<td>
								<Errors
									errors={getError(
										fields.totalOtherStaffBreakdown,
										errors
									)}
								/>
								<Form.Control
									type="number"
									value={totalOtherStaffBreakdown}
									onChange={(e) => {
										onChange(
											fieldNames.localContent
												.totalOtherStaffBreakdown,
											e.target.value
										);
									}}
								/>
							</td>
						</tr>
					</tbody>
				</Table>
			</FormGroup>

			<FormGroup>
				<FormLabel>
					3. Infrastructural Investments: The amount of money spent on
					infrastructure in Ghana *
				</FormLabel>{" "}
				<Errors errors={getError(fields.infraExpenditure, errors)} />
				<Form.Control
					type="number"
					value={infraExpenditure}
					onChange={(e) => {
						onChange(
							fieldNames.localContent.infraExpenditure,
							e.target.value
						);
					}}
				/>
			</FormGroup>

			<br />
			<h6>4. Value of Service</h6>
			<FormGroup>
				<FormLabel>
					a. Services rendered by other companies to the applicant in
					th past twelve (12) months in order for applicant to
					operate. (ie. Catering, logistics, etc)
				</FormLabel>
				<DynamicTable
					errors={getError(fields.valueOfServiceReceived._, errors)}
					data={valueOfServiceReceived}
					columns={valueOfServiceReceivedColumns}
					addNewRow={() => {
						valueOfServiceReceived.push({
							...NEW_VALUE_OF_SERVICE,
						});
						onChange(
							fieldNames.localContent.valueOfServiceReceived._,
							valueOfServiceReceived
						);
					}}
					editRow={(index) => {
						valueOfServiceReceived[index].isEditing = true;
						onChange(
							fieldNames.localContent.valueOfServiceReceived._,
							valueOfServiceReceived
						);
					}}
					deleteRow={(index) => {
						valueOfServiceReceived.splice(index, 1);
						onChange(
							fieldNames.localContent.valueOfServiceReceived._,
							valueOfServiceReceived
						);
					}}
					saveRow={(index) => {
						valueOfServiceReceived[index].isEditing = false;
						onChange(
							fieldNames.localContent.valueOfServiceReceived._,
							valueOfServiceReceived
						);
					}}
					updateRow={(index, key, value) => {
						valueOfServiceReceived[index][key] = value;
						onChange(
							fieldNames.localContent.valueOfServiceReceived,
							valueOfServiceReceived
						);
					}}
				/>
			</FormGroup>

			<FormGroup>
				<FormLabel>
					b. Services rendered by the applicant in the last twelve
					(12) months to other companies *
				</FormLabel>
				<DynamicTable
					columns={valueOfServiceProvidedColumns}
					data={valueOfServiceProvided}
					errors={getError(fields.valueOfServiceProvided._, errors)}
					addNewRow={() => {
						valueOfServiceProvided.push({
							...NEW_VALUE_OF_SERVICE,
						});
						onChange(
							fieldNames.localContent.valueOfServiceProvided._,
							valueOfServiceProvided
						);
					}}
					editRow={(index) => {
						valueOfServiceProvided[index].isEditing = true;
						onChange(
							fieldNames.localContent.valueOfServiceProvided._,
							valueOfServiceProvided
						);
					}}
					deleteRow={(index) => {
						valueOfServiceProvided.splice(index, 1);
						onChange(
							fieldNames.localContent.valueOfServiceProvided._,
							valueOfServiceProvided
						);
					}}
					saveRow={(index) => {
						valueOfServiceProvided[index].isEditing = false;
						onChange(
							fieldNames.localContent.valueOfServiceProvided._,
							valueOfServiceProvided
						);
					}}
					updateRow={(index, key, value) => {
						valueOfServiceProvided[index][key] = value;
						onChange(
							fieldNames.localContent.valueOfServiceProvided._,
							valueOfServiceProvided
						);
					}}
				/>
			</FormGroup>
			<br />
			<FormGroup>
				<FormLabel>
					5. List raw materials to be utilized (This applies to
					companies which use raw materials in their activities) *
				</FormLabel>
				<Errors errors={getError(fields.rawMaterials, errors)} />
				<Form.Control
					as="textarea"
					value={rawMaterials}
					onChange={(e) => {
						onChange(
							fieldNames.localContent.rawMaterials,
							e.target.value
						);
					}}
				/>
			</FormGroup>
			<br />
			<FormGroup>
				<FormLabel>
					6. List Ghanaian finished goods to be utilised *
				</FormLabel>
				<Errors
					errors={getError(fields.ghanaianFinishedGoods, errors)}
				/>
				<Form.Control
					as="textarea"
					value={ghanaianFinishedGoods}
					onChange={(e) => {
						onChange(
							fieldNames.localContent.ghanaianFinishedGoods,
							e.target.value
						);
					}}
				/>
			</FormGroup>
		</Form>
	);
}

export default LocalContent;
