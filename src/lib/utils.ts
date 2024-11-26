import { browser } from '$app/environment';
import { TaskPriority, type Kanban } from './localStore/types';
import { z } from 'zod';

/**
 * Downloads the given object as a JSON file with given name
 * @param data Data Object to be Downloaded
 * @param filename Filename
 * @returns void
 */
export const downloadAsJson = (data: object, filename: string) => {
	if (!browser) return;
	// Format JSON nicely with 2 spaces indentation
	const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
	const anchorElement = document.createElement('a');
	anchorElement.href = URL.createObjectURL(blob);
	anchorElement.download = filename;
	anchorElement.style.display = 'none'; // Hide the anchor element

	document.body.appendChild(anchorElement);
	anchorElement.click();

	document.body.removeChild(anchorElement); // Cleanup after download
};

/**
 * Uploads a JSON file and returns the parsed object
 * @returns Parsed JSON object
 * @returns null if no file is selected
 * @returns null if file is not a valid JSON
 */

export const uploadJson = async (): Promise<object | null> => {
	if (!browser) return null;
	const fileInput = document.createElement('input');
	fileInput.type = 'file';
	fileInput.accept = '.json';
	fileInput.style.display = 'none'; // Hide the file input

	document.body.appendChild(fileInput);
	fileInput.click();
	const file = await new Promise<File | null>((resolve) => {
		fileInput.onchange = () => {
			resolve(fileInput.files?.item(0) ?? null);
		};
	});

	document.body.removeChild(fileInput); // Cleanup after file selection

	if (!file) return null;

	const fileReader = new FileReader();
	fileReader.readAsText(file);
	return await new Promise<object | null>((resolve) => {
		fileReader.onload = () => {
			let data;
			try {
				data = JSON.parse(fileReader.result as string);
			} catch (error) {
				resolve(null);
			}
			resolve(data);
		};
	});
};

/**
 * Validates the given object as a kanban object, if invalid returns error
 * @param data Data to be validated
 * @returns Kanban object if valid
 * @returns Error object if invalid
 */
export const validateKanban = (data: unknown): Kanban | Error => {
	const formatZodErrors = (error: z.ZodError): string[] => {
		return error.errors.map((err) => {
			const path = err.path.join('.');
			const field = path.split('.').pop(); // Get the last part of the path (the field name)
			return `Expected '${field}' in '${path.replace(`.${field}`, '') || 'root'}'`;
		});
	};
	const kanbanSchema = z.object({
		id: z.string(),
		icon: z.string(),
		title: z.string(),
		sections: z.array(
			z.object({
				id: z.string(),
				title: z.string(),
				color: z.string(),
				tasks: z.array(
					z.object({
						id: z.string(),
						title: z.string(),
						description: z.string(),
						dueDate: z.string(),
						priority: z.nativeEnum(TaskPriority),
						notes: z.string()
					})
				)
			})
		)
	});

	try {
		const kanban = kanbanSchema.parse(data);
		return kanban;
	} catch (err) {
		console.log(err);
		if (err instanceof z.ZodError) {
			return new Error(formatZodErrors(err).join('\n'));
		} else {
			return new Error('Unknown error occurred');
		}
	}
};

/**
 * Returns the total tasks and completed tasks in a markdown string
 * @param markdown markdown string
 * @returns [totalTodos, completedTodos]
 */
export const parseToDos = (markdown: string): [number, number] => {
	let totalTodos = 0;
	let completedTodos = 0;

	const lines = markdown.split('\n');
	for (const line of lines) {
		if (line.startsWith('- [ ] ')) {
			totalTodos++;
		} else if (line.startsWith('- [x] ') || line.startsWith('- [X] ')) {
			totalTodos++;
			completedTodos++;
		}
	}
	return [totalTodos, completedTodos];
};

/**
 * Returns the total tasks and completed tasks in a kanban
 * @param kanban Kanban object
 * @returns Total number of tasks in the kanban
 */
export const totalTasksInKanban = (kanban: Kanban): number => {
	let totalTasks = 0;
	for (const sec of kanban.sections) {
		totalTasks += sec.tasks.length;
	}
	return totalTasks;
};

export function DeviceIsMobile(): boolean {
	if (
		// @ts-ignore TS2551 yes, I know that "navigator.userAgentData" is experimental
		typeof navigator.userAgentData === 'object' && // required for Safari
		// @ts-ignore TS2551 yes, I know that "navigator.userAgentData" is experimental
		'mobile' in navigator.userAgentData
	) {
		// @ts-ignore TS2551 yes, I know that "navigator.userAgentData" is experimental
		return navigator.userAgentData.mobile;
	} else {
		// the following code was basically taken from detectmobilebrowsers.com
		return (function (a: string): boolean {
			return (
				/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
					a
				) ||
				/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
					a.slice(0, 4)
				)
			);
			// @ts-ignore TS7015 yes, "window.opera" seems to be pretty non-standard
		})(navigator.userAgent || navigator.vendor || window.opera);
	}
}
